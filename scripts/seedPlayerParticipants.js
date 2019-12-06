require("dotenv").config();
var fetch = require("node-fetch");
var db = require("../models");

var playerParticipants = [
  {
    participantID: 1,
    playerID: "40000432"
  },
  {
    participantID: 1,
    playerID: "40000423"
  },
  {
    participantID: 1,
    playerID: "40001012"
  }
];

module.exports = function() {
  return db.PlayerParticipants.bulkCreate(playerParticipants);
};
