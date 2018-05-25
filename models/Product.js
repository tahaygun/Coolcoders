const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Productschema = new Schema({
  name: {
    type: String,
    required: true
  },
  details:{
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

module.exports = Product = mongoose.model("Product", Productschema);
