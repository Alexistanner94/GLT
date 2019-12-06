require("dotenv").config();
var db = require("../models");
var fetch = require("node-fetch");

// Add all tournaments for the 2020 season to the database
// Export this as a function to serverjs, so that new tournaments will be added
// Dont add a tournament if it is not over
db.sequelize.sync().then(function() {
  fetch(
    `https://api.sportsdata.io/golf/v2/json/Tournaments/2020?key=${process.env.API_KEY}`
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
