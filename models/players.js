module.exports = function(sequelize, DataTypes) {
  var Players = sequelize.define("Players", {
    name: DataTypes.STRING,
    ranking: DataTypes.INTEGER,
    bracket: DataTypes.STRING,
    playerID: DataTypes.STRING
  });
  return Players;
};
