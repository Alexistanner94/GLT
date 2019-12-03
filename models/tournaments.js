module.exports = function(sequelize, DataTypes) {
  var Tournaments = sequelize.define("Tournaments", {
    name: DataTypes.STRING,
    tournamentID: DataTypes.INTEGER,
    startDate: DataTypes.STRING,
    endDate: DataTypes.STRING,
    isOver: DataTypes.BOOLEAN
  });
  return Tournaments;
};
