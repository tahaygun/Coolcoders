const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Historyschema = new Schema({
  name: {
    type: String,
    required: true
  },
  event: {
    type: String,
    required: true,
  },
  money:{
    type:String,
    required:true
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date().toJSON().slice(0,16)
  }
});

module.exports = History = mongoose.model("History", Historyschema);
