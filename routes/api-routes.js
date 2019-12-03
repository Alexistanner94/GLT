var path = require("path");
var db = require("../models");

module.exports = function(app) {
  // Post Participants
  app.post("/api/participants", function(req, res) {
    db.Participants.findAll({
      where: { bracket: "a" },
      include: [
        {
          model: db.Players
        }
      ]
    }).then(players => {
      res.json(players);
    });
  });

  // Get Players
  app.get("/api/players", function(req, res) {
    db.Players.findAll({
      include: {
        model: db.Earnings
      }
    }).then(players => {
      res.json(players);
    });
  });

  // Get Earnings
  app.get("/api/earnings", function(req, res) {
    db.Players.findAll({ where: { bracket: "a" } }).then(players => {
      players.forEach(ranking => {
        // get the name
        // fetch from api given that name
      });
    });
  });
};
