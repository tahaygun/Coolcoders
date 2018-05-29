const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Groupschema = new Schema({
  name: {
    type: String,
    required: true
  },
  team: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Team"
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = Group = mongoose.model("Group", Groupschema);
