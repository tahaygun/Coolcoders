const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
var Walletschema = new Schema({
  name: {
    type: String,
    required: true
  },
  group: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Group"
  },
  team: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Team"
  },
  coins: {
    type: Number,
    default:0
  },
  history:{
    type:Array,
    required:true,
    default:[`Wallet created at ${new Date().toLocaleString()}`],
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
var connection = mongoose.createConnection("mongodb://admin:rootpass@ds119059.mlab.com:19059/restartproject");
autoIncrement.initialize(connection);
Walletschema.plugin(autoIncrement.plugin, { model: 'Wallet', field: 'seqId' });

module.exports = Wallet = mongoose.model("Wallet", Walletschema);
