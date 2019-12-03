module.exports = function(sequelize, DataTypes) {
  var Participants = sequelize.define("Participants", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: DataTypes.STRING
  });

  Participants.associate = function(models) {
    Participants.belongsToMany(models.Players, {
      through: "Rosters"
    });
  };

  return Participants;
};
