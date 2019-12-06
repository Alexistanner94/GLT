require("dotenv").config();
var fetch = require("node-fetch");
var db = require("../models");

db.sequelize.sync({ force: true }).then(function() {
  fetch(
    `https://api.sportsdata.io/golf/v2/json/PlayerSeasonStats/2019?key=${process.env.API_KEY}`
  )
    .then(res => res.json())
    .then(rankings =>
      rankings
        .map(rankingData => {
          const ranking = {
            name: rankingData.Name,
            ranking: rankingData.WorldGolfRank,
            playerID: rankingData.PlayerID
          };
          if (ranking.ranking < 25) {
            ranking.bracket = "a";
          } else if ((ranking.ranking >= 25) & (ranking.ranking < 50)) {
            ranking.bracket = "b";
          } else if ((ranking.ranking >= 50) & (ranking.ranking < 75)) {
            ranking.bracket = "c";
          } else if ((ranking.ranking >= 75) & (ranking.ranking < 100)) {
            ranking.bracket = "d";
          } else if ((ranking.ranking >= 100) & (ranking.ranking <= 127)) {
            ranking.bracket = "e";
          }
          return ranking;
        })
        .filter(function(ranking) {
          return (ranking.ranking <= 127) & (ranking.ranking != null);
        })
    )
    .then(function(rankings) {
      db.Players.bulkCreate(rankings).then(function() {
        console.log("Done");
        db.sequelize.close();
      });
    });
});
