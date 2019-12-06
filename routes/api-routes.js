var path = require("path");
var db = require("../models");

var seedTournaments = require("../scripts/seedTournaments.js");
var seedEarnings = require("../scripts/seedEarnings.js");

module.exports = function(app) {
  // Post Participants
  app.post("/api/participants", function(req, res) {
    db.Participants.create({
      name: req.body.name
    }).then(data => {
      res.json(data);
    });
  });

  // Player Route with Bracket
  app.get("/api/players/:bracket", function(req, res) {
    db.Players.findAll({
      where: {
        bracket: req.params.bracket
      }
    }).then(data => {
      res.json(data);
    });
  });

  // Post Team
  app.post("/api/pick", function(req, res) {
    console.log(req.body);

    db.PlayerParticipants.create({
      playerID: req.body.playerID,
      participantID: parseInt(req.body.participantID)
    }).then(data => {
      res.json(data);
    });
  });

  // Get Earnings
  app.get("/api/earnings", function(req, res) {
    // if the last reload is a while ago
    // seedTournaments().then(function() {
    //   seedEarnings();
    // });

    db.Participants.findAll({
      include: {
        model: db.Players,
        attributes: ["name", "ranking", "bracket", "playerID"],
        include: {
          model: db.Earnings,
          attributes: ["earnings"]
        },
        through: {
          attributes: []
        }
      },
      attributes: ["participantID", "name"]
    })
      .then(function(participants) {
        let result = [];
        participants.forEach(function(participant) {
          let participantSum = 0;
          participant.dataValues.Players.forEach(function(player) {
            let playerSum = 0;
            player.dataValues.Earnings.forEach(
              earning => (playerSum += earning.earnings)
            );
            participantSum += playerSum;
          });
          result.push({
            partName: participant.name,
            partEarnings: participantSum
          });
        });
        return result;
      })
      .then(function(result) {
        result.sort(function(a, b) {
          var keyA = a.partEarnings,
            keyB = b.partEarnings;
          if (keyA > keyB) return -1;
          if (keyA < keyB) return 1;
          return 0;
        });
        return result;
      })
      .then(function(results) {
        results.forEach(function(result, i) {
          result.partRanking = i + 1;
        });
        res.json(results);
      });
  });
};
