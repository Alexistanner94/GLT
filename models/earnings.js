module.exports = function(sequelize, DataTypes) {
  var Earnings = sequelize.define("Earnings", {
    playerID: DataTypes.STRING,
    tournamentID: DataTypes.STRING,
    earnings: DataTypes.FLOAT
  });

  Earnings.associate = function(models) {
    Earnings.belongsTo(models.Players, {
      foreignKey: "playerID",
      targetKey: "playerID"
    });
  };

  return Earnings;
};
