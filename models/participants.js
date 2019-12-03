module.exports = function(sequelize, DataTypes) {
  var Participants = sequelize.define("Participants", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: DataTypes.STRING
  });
  return Participants;
};
