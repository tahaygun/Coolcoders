const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Teamchema = new Schema({
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
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Team = mongoose.model("Team", Teamchema);
