require("dotenv").config();
var db = require("../models");
var fetch = require("node-fetch");

module.exports = function() {
  db.Tournaments.findAll({
    attributes: ["tournamentID"]
  })
    .then(tournamentIDs =>
      tournamentIDs.map(tournament => tournament.dataValues.tournamentID)
    )
    .then(tournamentIDs =>
      tournamentIDs.forEach(id => {
        fetch(
          `https://api.sportsdata.io/golf/v2/json/Leaderboard/${id}?key=${process.env.API_KEY}`
        )
          .then(res => res.json())
          .then(async function(tournament) {
            const dbPlayers = await db.Players.findAll({
              attributes: ["playerID"]
            });
            const dbPlayerIds = dbPlayers.map(p =>
              parseInt(p.dataValues.playerID)
            );

            tournament.Players.forEach(function(player) {
              if (player.Earnings && dbPlayerIds.includes(player.PlayerID)) {
                db.Earnings.create({
                  playerID: player.PlayerID,
                  tournamentID: id,
                  earnings: player.Earnings
                });
              }
            });
          })
          .catch(function() {
            console.log("error");
          });
      })
    );
};
