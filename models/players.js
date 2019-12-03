module.exports = function(sequelize, DataTypes) {
  var Players = sequelize.define("Players", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  });
  return Players;
};
