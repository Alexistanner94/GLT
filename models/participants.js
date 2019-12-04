module.exports = function(sequelize, DataTypes) {
  var Participants = sequelize.define("Participants", {
    participantID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: DataTypes.STRING
  });

  Participants.associate = function(models) {
    Participants.belongsToMany(models.Players, {
      through: models.PlayerParticipants,
      foreignKey: "participantID",
      otherKey: "playerID"
    });
  };

  return Participants;
};
