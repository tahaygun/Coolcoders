const { check, validationResult } = require("express-validator/check");
//To get all coupons
function couponController(router) {
  var validation = [
    check("coupon_id")
      .not()
      .isEmpty()
      .withMessage("Coupon is required!"),
      
  ];
  router.post("/homelogin", validation, (req, res) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ errors: errors.mapped() });
    }
    Coupon.find({
        coupon_id: req.body.coupon_id,
     
    })
      .then(function(coupon) {
        if (!coupon_id) {
          return res.status(401).send({
            errors: {
              logError: "Wrong access info!"
            }
          });
        } else {
          req.session.coupon_id = coupon_id;
          return res.send({ message: "You are signed in" });
        }

        res.send(coupon_id);
      })
      .catch(function(error) {
        console.log(error);
      });
  });

  //@To create coupon
  router.post("/addcoupon", validation, (req, res) => {
      console.log(req.body)
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ errors: errors.mapped() });
    }
    var coupon = new Coupon(req.body);
    coupon
      .save()
      .then(savedcoupon => {
        res.json(savedcoupon);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  });

  //@To delete coupon
  router.delete("/deletecoupon/:id", (req, res) => {
    id
      .findByIdAndRemove(req.params.coupon_id)
      .then(result => {
        res.send(result);
      })
      .catch(err => res.send(err));
  });


}
module.exports = couponController;