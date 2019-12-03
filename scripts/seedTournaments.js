require("dotenv").config();
var db = require("../models");
var fetch = require("node-fetch");
// Call Schedule By Season 2020
// Fill TournamentsDB

db.sequelize.sync().then(function() {
  fetch(
    "https://api.sportsdata.io/golf/v2/json/Tournaments/2020?key=e9828bf943474a838f59ff47bc3c75e9"
  )
    .then(res => res.json())
    .then(tournaments =>
      tournaments.map(tournaments => {
        const tournamentsData = {
          name: tournaments.Name,
          tournamentID: tournaments.TournamentID,
          startDate: tournaments.StartDate,
          endDate: tournaments.EndDate,
          isOver: tournaments.IsOver
        };

        return tournamentsData;
      })
    )
    .then(function(tournaments) {
      db.Tournaments.bulkCreate(tournaments).then(function() {
        console.log("Done");
        db.sequelize.close();
      });
    });
});
