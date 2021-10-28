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

//options
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

//listening to the event message
socket.on("message", (message) => {
  console.log(message);
  const html = Mustache.render(messagesTemplate, {
    message: message.text,
    createdAt: moment(message.createdAt).format("HH:mm"),
  });

  $messages.insertAdjacentHTML("beforeend", html);
});

//listening to the event locationMessage
socket.on("locationMessage", (locationUrl) => {
  console.log(locationUrl);

  //Render template of html
  const html = Mustache.render(locationTemplate, {
    locationUrl: locationUrl.url,
    createdAt: moment(locationUrl.createdAt).format("HH:mm"),
  });

  $messages.insertAdjacentHTML("beforeend", html);
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

socket.emit("join", { username, room });
