module.exports = function(sequelize, DataTypes) {
  var PlayerParticipants = sequelize.define("PlayerParticipants", {
    participantID: DataTypes.INTEGER,
    playerID: DataTypes.STRING
  });

  return PlayerParticipants;
};
