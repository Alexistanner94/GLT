var fetch = require("node-fetch");
// Tiger Woods
var playerID = "40000019";

fetch(
  "https://api.sportsdata.io/golf/v2/json/Tournaments?key=e9828bf943474a838f59ff47bc3c75e9"
)
  .then(res => res.json())
  .then(data => data.map(tournamentData => tournamentData.TournamentID))
  .then(tournamentIds =>
    tournamentIds.forEach(tournamentId => {
      fetch(
        `https://api.sportsdata.io/golf/v2/json/PlayerTournamentStatsByPlayer/${tournamentId}/${playerID}?key=e9828bf943474a838f59ff47bc3c75e9`
      )
        .then(res => res.json())
        .then(data => console.log(data.map(data => data.Earnings)))
        .catch(function() {
          console.log("error");
        });
    })
  );
