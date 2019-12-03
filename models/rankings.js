module.exports = function(sequelize, DataTypes) {
  var Rankings = sequelize.define("Rankings", {
    name: DataTypes.STRING,
    ranking: DataTypes.INTEGER,
    bracket: DataTypes.STRING
  });
  return Rankings;
};
