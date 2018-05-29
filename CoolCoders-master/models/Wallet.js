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
    ref: "Group"
  },
  coins: {
    type: Number,
    required:true,
    default:0
  },
  history:{
    type:Array,
    required:true,
    default:[`Wallet created at ${new Date().toJSON().slice(0,16)}`],
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});
var connection = mongoose.createConnection("mongodb://admin:rootpass@ds119059.mlab.com:19059/restartproject");


module.exports = Wallet = mongoose.model("Wallet", Walletchema);
