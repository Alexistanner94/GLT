require("dotenv").config();
var db = require("../models");
var fetch = require("node-fetch");

module.exports = function() {
  return db.Tournaments.findAll({
    attributes: ["tournamentID"]
  })
    .then(tournamentIDs =>
      tournamentIDs.map(tournament => tournament.dataValues.tournamentID)
    )
    .then(tournamentIDs => {
      const apiPromises = tournamentIDs.map(id => {
        return fetch(
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

            const createEarningsPromises = tournament.Players.filter(
              player => player.Earnings && dbPlayerIds.includes(player.PlayerID)
            ).map(function(player) {
              return db.Earnings.create({
                playerID: player.PlayerID,
                tournamentID: id,
                earnings: player.Earnings
              });
            });

            return Promise.all(createEarningsPromises);
          });
      });

      return Promise.all(apiPromises);
    });
};
