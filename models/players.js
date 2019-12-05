module.exports = function(sequelize, DataTypes) {
  var Players = sequelize.define(
    "Players",
    {
      name: DataTypes.STRING,
      ranking: DataTypes.INTEGER,
      bracket: DataTypes.STRING,
      playerID: DataTypes.STRING
    },
    {
      indexes: [
        {
          fields: ["playerID"]
        }
      ]
    }
  );

  Players.associate = function(models) {
    Players.belongsToMany(models.Participants, {
      through: models.PlayerParticipants,
      sourceKey: "playerID",
      foreignKey: "playerID",
      otherKey: "participantID"
    });

    Players.hasMany(models.Earnings, {
      foreignKey: "playerID",
      sourceKey: "playerID"
    });
  };

  return Players;
};
