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

  // Get Earnings
  app.get("/api/earnings", function(req, res) {
    //   db.Players.findAll({
    //     include: {
    //       model: db.Earnings
    //     }
    //   }).then(players => console.log(players));
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
            participantName: participant.name,
            totalEarnings: participantSum
          });
        });
        return result;
      })
      .then(result => res.json(result));
  });
};
