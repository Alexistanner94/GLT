require("dotenv").config();
var fetch = require("node-fetch");
var db = require("../models");

module.exports = function() {
  return fetch(
    `https://api.sportsdata.io/golf/v2/json/PlayerSeasonStats/2019?key=${process.env.API_KEY}`
  )
    .then(res => res.json())
    .then(rankings =>
      rankings
        .map(assignBracket)
        .filter(ranking => (ranking.ranking <= 127) & (ranking.ranking != null))
    )
    .then(function(rankings) {
      return db.Players.bulkCreate(rankings);
    });
};

function assignBracket(rankingData) {
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
}
