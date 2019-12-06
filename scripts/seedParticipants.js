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

module.exports = function() {
  return db.Participants.bulkCreate(participants);
};
