var db = require("../models");
var seedData = require("../seedData.json");

db.Players.bulkCreate(seedData).then(function() {
  db.Players.findAll();
});
