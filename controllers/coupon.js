const { check, validationResult } = require("express-validator/check");
//To get all coupons
function couponController(router) {
  var validation = [
    check("couponCode")
      .not()
      .isEmpty()
      .withMessage("Coupon is required!")
  ];
  router.post("/homelogin", validation, (req, res) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).send({ errors: "Coupon code is required!" });
    }
    console.log(req.body);
    Coupon.findOne({ couponCode: req.body.couponCode })
      .then(coupon => {
        console.log(coupon);
        if (coupon) {
          req.session.couponCode = coupon.couponCode;
          res.json({ isLoggedIn: true, coupon: coupon.couponCode });
        } else {
          res.status(401).json({ errors: "Invalid coupon code!" });
        }
      })
      .catch(function(error) {
        res.status(401).send(error);
      });
  });

  //@to check session for coupon
  router.get('/isvalidcoupon',(req,res)=>{
    if (req.session.couponCode) {
      console.log(req.session.couponCode);
      res.send({isLoggedIn:true})
    }else{
      res.status(401).send({isLoggedIn:false})      
    }
  })


  //@To create coupon
  router.post("/addcoupon", validation, (req, res) => {
    console.log(req.body);
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
      .findByIdAndRemove(req.params.couponCode)
      .then(result => {
        res.send(result);
      })
      .catch(err => res.send(err));
  });
}
module.exports = couponController;
