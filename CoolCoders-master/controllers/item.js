const { check, validationResult } = require("express-validator/check");
function itemController(router) {
  var validations = [
    check("name")
      .not()
      .isEmpty()
      .withMessage("Name is required")
      .isLength({ min: 2 })
      .withMessage("Firstname should be at least 2 letters"),
    check("shortDesc")
      .not()
      .isEmpty()
      .withMessage("Short description is required")
      .isLength({ min: 2 })
      .withMessage("Short description should be at least 2 letters"),
    check("longDesc")
      .not()
      .isEmpty()
      .withMessage("Long description is required")
      .isLength({ min: 2 })
      .withMessage("Long description should be at least 2 letters"),
    check("price")
      .not()
      .isEmpty()
      .withMessage("Price is required")
      .isNumeric()
      .withMessage("Price should be a number.")
  ];
  //To get all itemS
  router.get("/allitems", (req, res) => {
    Item.find()
      .then(items => {
        res.json(items);
      })
      .catch(err => {
        res.status(404).json(err);
      });
  });

  //@to get one item
  router.get("/item/:id", (req, res) => {
    Item.findById(req.params.id)
      .then(item => {
        res.json({ item: item });
      })
      .catch(err => res.status(404).json(err));
  });

  //@To create item

  router.post("/additem", validations, (req, res) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).send({ errors: errors.mapped() });
    }
    var item = new Item(req.body);
    item
      .save()
      .then(saveditem => {
        res.json(saveditem);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  });

  //@To edit item

  router.put("/edititem/:id", validations, (req, res) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).send({ errors: errors.mapped() });
    }
    Item.findById(req.params.id)
      .then(item => {
        item.name = req.body.name;
        item.details = req.body.details;
        item.price = req.body.price;
        item.sold = req.body.sold;
        item.imgUrl = req.body.imgUrl;
        item
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

  //@To delete item
  router.delete("/deleteitem/:id", (req, res) => {
    Item.findByIdAndRemove(req.params.id)
      .then(result => {
        res.send(result);
      })
      .catch(err => res.send(err));
  });
}

module.exports = itemController;
