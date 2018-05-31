const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Historyschema = new Schema({
  event: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = History = mongoose.model("History", Historyschema);
