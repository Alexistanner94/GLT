require("dotenv").config();
var db = require("../models");
var fetch = require("node-fetch");
// Call Schedule By Season 2020
// Fill TournamentsDB
db.sequelize.sync().then(function() {
  db.Tournaments.findAll({
    attributes: ["tournamentID"]
  })
    .then(tournamentIDs =>
      tournamentIDs.map(tournament => tournament.dataValues.tournamentID)
    )
    .then(tournamentIDs =>
      tournamentIDs.forEach(id => {
        fetch(
          `https://api.sportsdata.io/golf/v2/json/Leaderboard/${id}?key=afc83775bbd2420182e7c78e8bdd6236`
        )
          .then(res => res.json())
          .then(async function(tournament) {
            const dbPlayers = await db.Players.findAll({
              attributes: ["playerID"]
            });
            const dbPlayerIds = dbPlayers.map(p =>
              parseInt(p.dataValues.playerID)
            );
            const apiPlayerIds = tournament.Players.map(p =>
              parseInt(p.PlayerID)
            );

            tournament.Players.forEach(function(player) {
              console.log(dbPlayerIds.includes(player.PlayerID));
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
            // console.log("error");
          });
      })
    );
});
