module.exports = function(sequelize, DataTypes) {
  var Earnings = sequelize.define("Earnings", {
    playerName: DataTypes.STRING,
    playerID: DataTypes.STRING,
    tournamentName: DataTypes.STRING,
    tournamentID: DataTypes.STRING,
    earnings: DataTypes.FLOAT
  });
  return Earnings;
};
