const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Couponschema = new Schema({
  couponCode: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }

});

module.exports = Coupon = mongoose.model("Coupon", Couponschema);