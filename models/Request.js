const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var Requestschema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  proofImg: {
    type: String,
    required: true
  },
  item: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Item"
  },
  status: {
    type: String,
    required: true,
    default: "Pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Request = mongoose.model("Request", Requestschema);
