module.exports = function(sequelize, DataTypes) {
  var Players = sequelize.define("Players", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  });
  return Players;
};
