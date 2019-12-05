require("dotenv").config();
var fetch = require("node-fetch");
var db = require("../models");

var participants = [
  {
    name: "Ross"
  },
  {
    name: "Jonathan"
  },
  {
    name: "Graeme"
  },
  {
    name: "Alexis"
  }
];

db.sequelize.sync().then(function() {
  db.Participants.bulkCreate(participants).then(function() {
    console.log("Done");
    db.sequelize.close();
  });
});
