var path = require("path");

module.exports = function(app) {
<<<<<<< HEAD
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    app.get("/buildteam", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/buildteam.html"));
    });

    app.get("/leaderboard", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/leaderboard.html"));
    });

    app.get("/admin", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/admin.html"));
    });
};
=======
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/buildteam", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/buildteam.html"));
  });

  app.get("/leaderboard", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/leaderboard.html"));
  });

  app.get("/partadmin", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/partadmin.html"));
  });

  app.get("/about", function(req, res){
    res.sendFile(path.join(__dirname, "../public/about.html"));
  });

  app.get("/signup", function(req, res){
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });
};
>>>>>>> 1f58396c179d8d2d447c17f3addb193b1d966385
