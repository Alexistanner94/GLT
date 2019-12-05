var path = require("path");

module.exports = function(app) {

    app.get("/admin", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/admin.html"));
    });
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/buildteam", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/buildteam.html"));
  });

  app.get("/leaderboard", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/leaderboard.html"));
  });
  app.get("/about", function(req, res){
    res.sendFile(path.join(__dirname, "../public/about.html"));
  });

  app.get("/signup", function(req, res){
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });
};
