const socket = io();

//Elements

const $messageForm = document.querySelector("#message-form");
const $messageFormInput = $messageForm.querySelector("input");
const $messageFormButton = $messageForm.querySelector("button");
const $sendLocationButton = document.querySelector("#send-location");
const $messages = document.querySelector("#messages");

//templates
const messagesTemplate = document.querySelector("#message-template").innerHTML;
const locationTemplate = document.querySelector("#location-template").innerHTML;
const sidebarTemplate = document.querySelector("#sidebar-template").innerHTML;

//options
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

//mais complexo para dar uma experiencia melhor (quando o usuario for ler uma mensagem acima ele não vai ser "puxado para baixo")
const autoscroll = () => {
  //new message element
  const $newMessage = $messages.lastElementChild;

  //Height of the new message
  const newMessageStyles = getComputedStyle($newMessage);
  const newMessageMargin = parseInt(newMessageStyles.marginBottom);
  const newMessageHeigh = $newMessage.offsetHeight + newMessageMargin;

  //visible height
  const visibleHeight = $messages.offsetHeight;

  //Height of messages container
  const containerHeight = $messages.scrollHeight;

  //How far have i scrolled?
  const scrollOffSet = $messages.scrollTop + visibleHeight;

  if (containerHeight - newMessageHeigh <= scrollOffSet) {
    //se quiser apenas scroll pro final da pagina
    $messages.scrollTop = $messages.scrollHeight;
  }
};

//listening to the event message
socket.on("message", (messageInformation) => {
  console.log(messageInformation);
  const html = Mustache.render(messagesTemplate, {
    username: messageInformation.username,
    message: messageInformation.text,
    createdAt: moment(messageInformation.createdAt).format("HH:mm"),
  });

  $messages.insertAdjacentHTML("beforeend", html);

  autoscroll();
});

//listening to the event locationMessage
socket.on("locationMessage", (messageInformation) => {
  console.log(messageInformation);

  //Render template of html
  const html = Mustache.render(locationTemplate, {
    username: messageInformation.username,
    locationUrl: messageInformation.url,
    createdAt: moment(messageInformation.createdAt).format("HH:mm"),
  });

  $messages.insertAdjacentHTML("beforeend", html);
  autoscroll();
});

socket.on("roomData", ({ room, users }) => {
  const html = Mustache.render(sidebarTemplate, {
    room,
    users,
  });
  document.querySelector("#sidebar").innerHTML = html;
});

//listening to the event submit from form
$messageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  $messageFormButton.setAttribute("disabled", "disabled");

  const message = e.target.elements.message.value;

  socket.emit("sendMessage", message, (error) => {
    $messageFormButton.removeAttribute("disabled");
    $messageFormInput.value = "";
    $messageFormInput.focus();

    if (error) {
      return console.log(error);
    }

    console.log("Message delivered.");
  });
});

//listening to the event click from button send location
$sendLocationButton.addEventListener("click", () => {
  $sendLocationButton.setAttribute("disabled", "disabled");

  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser!");
  }

  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit(
      "sendLocation",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      (error) => {
        $sendLocationButton.removeAttribute("disabled");
        if (error) {
          return console.log(error);
        }

        console.log("Location Shared!");
      }
    );
  });
});

socket.emit("join", { username, room }, (error) => {
  if (error) {
    alert(error);
    location.href = "/";
  }
});
