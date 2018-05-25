const { check, validationResult } = require("express-validator/check");
function productController(router) {
  var validations = [
    check("name")
      .not()
      .isEmpty()
      .withMessage("Name is required")
      .isLength({ min: 2 })
      .withMessage("Firstname should be at least 2 letters"),
    check("details")
      .not()
      .isEmpty()
      .withMessage("Details is required")
      .isLength({ min: 2 })
      .withMessage("Details should be at least 2 letters"),
    check("price")
      .not()
      .isEmpty()
      .withMessage("Price is required")
      .isNumeric()
      .withMessage("Price should be a number.")
  ];
  //To get all PRODUCTS
  router.get("/allproducts", (req, res) => {
    Product.find()
      .then(Products => {
        res.json(Products);
      })
      .catch(err => {
        res.status(404).json(err);
      });
  });

  //@to get one PRODUCT
  router.get("/product/:id", (req, res) => {
    Product.findById(req.params.id)
      .then(product => {
        res.json({ product: product });
      })
      .catch(err => res.status(404).json(err));
  });

  //@To create PRODUCT

  router.post("/addproduct", validations, (req, res) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ errors: errors.mapped() });
    }
    var product = new Product(req.body);
    product
      .save()
      .then(savedProduct => {
        res.json(savedProduct);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  });

  //@To edit PRODUCT

  router.put("/editproduct/:id", validations, (req, res) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ errors: errors.mapped() });
    }
    Product.findById(req.params.id)
      .then(product => {
        product.name = req.body.name;
        product.details = req.body.details;
        product.price = req.body.price;
        product.sold = req.body.sold;
        product.imgUrl = req.body.imgUrl;
        product
          .save()
          .then(result => {
            res.send(result);
          })
          .catch(err => res.send(res));
      })
      .catch(err => {
        res.status(404).send(err);
      });
  });

  //@To delete PRODUCT
  router.delete("/deleteproduct/:id", (req, res) => {
    Product.findByIdAndRemove(req.params.id)
      .then(result => {
        res.send(result);
      })
      .catch(err => res.send(res));
  });
}

module.exports = productController;
