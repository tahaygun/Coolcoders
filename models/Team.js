const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Teamchema = new Schema({
  teamID : {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String,
    // required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Team = mongoose.model("Team", Teamchema);
