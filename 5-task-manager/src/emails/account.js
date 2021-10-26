var api_key = "a1f71cc60130d26c094c981c71846a42-20ebde82-d787ce6c";
var domain = "sandboxe31bc9cb3c5a423b994a9fe4a48f76cb.mailgun.org";
var mailgun = require("mailgun-js")({ apiKey: api_key, domain: domain });

// var data = {
//   from: "Excited User <yasmin@hyerdev.com>",
//   to: "yasmin@hyerdev.com",
//   subject: "Hello",
//   text: "Testing some Mailgun awesomeness!",
// };

// mailgun.messages().send(data, function (error, body) {
//   if (error) {
//     console.log(error);
//   }
//   console.log(body);
// });

//welcom email
const sendWelcomeEmail = (email, name) => {
  var data = {
    from: "Yas <yasmin@hyerdev.com>",
    to: email,
    subject: "Welcome to de app!",
    text: `Welcome ${name}, Let me know how you get along with the app.`,
  };

  mailgun.messages().send(data, function (error, body) {
    if (error) {
      console.log(error);
    }
    console.log(body);
  });
};

const sendCancelationEmail = (email, name) => {
  var data = {
    from: "Yas <yasmin@hyerdev.com>",
    to: email,
    subject: "Sorry to see you go",
    text: `Goodbye ${name} :(, Is there anything we could have done to kept you on board?
        Hope to see you back soon...`,
  };

  mailgun.messages().send(data, function (error, body) {
    if (error) {
      console.log(error);
    }
    console.log(body);
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail,
};
