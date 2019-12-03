const http = require("http");
PORT = process.env.PORT || 8080;
server = http.createServer(function(req, res) {
  response.end("Yay! It Worked!");
});

server.listen(3000, function() {
  console.log("Server listening on: http//localhost:" + PORT);
});

var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}
