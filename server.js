<<<<<<< HEAD
const http = require("http");
PORT = process.env.PORT || 8080;
server = http.createServer(function(req, res) {
    response.end("Yay! It Worked!");
});

server.listen(3000, function() {
    console.log("Server listening on: http//localhost:" + PORT);
});

=======
>>>>>>> 1f58396c179d8d2d447c17f3addb193b1d966385
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

db.sequelize.sync().then(function() {
<<<<<<< HEAD
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});
=======
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
>>>>>>> 1f58396c179d8d2d447c17f3addb193b1d966385
