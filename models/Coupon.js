const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Couponschema = new Schema({
  coupon_id: {
    type: Number,
    required: true
  }

});

module.exports = Coupon = mongoose.model("Coupon", Couponschema);