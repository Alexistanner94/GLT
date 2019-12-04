// <<<<<<< HEAD
// const http = require("http");
// PORT = process.env.PORT || 8080;
// server = http.createServer(function(req, res) {
//   response.end("Yay! It Worked!");
// });

// server.listen(3000, function() {
//   console.log("Server listening on: http//localhost:" + PORT);
// });

// var slideIndex = 0;
// showSlides();

// function showSlides() {
//   var i;
//   var slides = document.getElementsByClassName("mySlides");
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";
//   }
//   slideIndex++;
//   if (slideIndex > slides.length) {
//     slideIndex = 1;
//   }
//   slides[slideIndex - 1].style.display = "block";
//   setTimeout(showSlides, 2000); // Change image every 2 seconds
// }
// =======
require("dotenv").config();
var express = require("express");

var app = express();
var PORT = process.env.PORT || 8080;

var db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// db.sequelize.sync().then(function() {
//   app.listen(PORT, function() {
//     console.log("App listening on PORT " + PORT);
//   });
// });

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
// >>>>>>> d096cbab8416fd15cd3f64e688faef8451bda11d