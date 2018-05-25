function productController(router) {
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

  router.post("/addproduct", (req, res) => {
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

  router.put("/editproduct/:id", (req, res) => {
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
