const seedPlayers = require("./seedPlayers");
const seedTournaments = require("./seedTournaments");
const seedParticipants = require("./seedParticipants");
const seedPlayerParticpants = require("./seedPlayerParticipants");
const seedEarnings = require("./seedEarnings");

require("dotenv").config();
var db = require("../models");

db.sequelize
  .sync({ force: true })
  .then(function() {
    return seedPlayers();
  })
  .then(function() {
    return seedTournaments();
  })
  .then(function() {
    return seedParticipants();
  })
  .then(function() {
    return seedPlayerParticpants();
  })
  .then(function() {
    return seedEarnings();
  })
  .then(function() {
    db.sequelize.close();
  });

// Run this file on heroku deployment
// heroku-postbuild in package.json
