const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
var Itemschema = new Schema({
  name: {
    type: String,
    required: true
  },
  shortDesc:{
    type: String,
    required: true
  },
  longDesc:{
    type: String,
    required: true
  },
  price:{
    type: Number,
    required: true
  },
  sold:{
    type: Number,
    required:true,
    default:0
  },
  imgUrl:{
    type:String,
    // required:true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
var connection = mongoose.createConnection("mongodb://admin:rootpass@ds119059.mlab.com:19059/restartproject");
autoIncrement.initialize(connection);
Itemschema.plugin(autoIncrement.plugin, { model: 'Item', field: 'seqId' });
module.exports = Item = mongoose.model("Item", Itemschema);
