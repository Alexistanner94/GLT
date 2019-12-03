var fetch = require("node-fetch");
var db = require("../models");
const Op = db.Sequelize.Op;

db.sequelize.sync({ force: true }).then(function() {
  fetch(
    "https://api.sportsdata.io/golf/v2/json/PlayerSeasonStats/2019?key=acf621c9c91643c9b0d55c1960551b04"
  )
    .then(res => res.json())
    .then(rankings =>
      rankings
        .map(rankingData => {
          const ranking = {
            name: rankingData.Name,
            ranking: rankingData.WorldGolfRank
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
      db.Rankings.bulkCreate(rankings).then(function() {
        console.log("Done");
        db.sequelize.close();
      });
    });
  // .then(function() {
  //   db.Rankings.update(
  //     { bracket: "a" },
  //     { where: { ranking: { [Op.lte]: 15 } } }
  //   ).then(function() {
  //     console.log("Done");
  //   });
  // });
});
