const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Walletchema = new Schema({
  name: {
    type: String,
    required: true
  },
  group: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Team"
  },
  coins: {
    type: Number,
    required: true,
    default:0
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = Wallet = mongoose.model("Wallet", Walletchema);
