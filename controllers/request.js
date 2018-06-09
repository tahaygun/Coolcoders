const { check, validationResult } = require("express-validator/check");
const fs = require("fs");
function requestController(router, upload,auth) {
  var validations = [
    check("title")
      .not()
      .isEmpty()
      .withMessage("Title is required")
      .isLength({ min: 2 })
      .withMessage("FirstTitle should be at least 2 letters"),
    check("description")
      .not()
      .isEmpty()
      .withMessage("Description is required")
      .isLength({ min: 2 })
      .withMessage("Description should be at least 2 letters")
  ];
  //To get all requestS
  router.get("/allrequests",auth, (req, res) => {
    Request.find()
      .populate("item")
      .then(requests => {
        res.json(requests);
      })
      .catch(err => {
        res.status(404).json(err);
      });
  });

  //@to get one request
  router.get("/request/:id",auth, (req, res) => {
    Request.findById(req.params.id)
      .then(request => {
        res.json({ request: request });
      })
      .catch(err => res.status(404).json(err));
  });
  //@to accept request
  router.put("/acceptRequest/:id",auth, (req, res) => {
    Request.findByIdAndUpdate(req.params.id)
      .then(request => {
        request.status = "Accepted";
        request
          .save()
          .then(answ => {
            Item.findByIdAndUpdate(answ.item).then(item => {
              item.sold = item.sold + 1;
              item.save().then(itemsaved => {
                res.send(answ);
              });
            });
          })
          .catch(err => res.send(err));
      })
      .catch(err => res.status(404).json(err));
  });

  //@to reject request;
  router.put("/rejectRequest/:id",auth, (req, res) => {
    Request.findByIdAndUpdate(req.params.id)
      .then(request => {
        request.status = "Rejected";
        request
          .save()
          .then(answ => {
            res.send(answ);
          })
          .catch(err => res.send(err));
      })
      .catch(err => res.status(404).json(err));
  });

  //@To create request

  router.post(
    "/addrequest",
    upload.fields([{ name: "proofImg", maxCount: 1 }]),
    validations,
    (req, res) => {
      var errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(500).send({ errors: errors.mapped() });
      }
      var filename = null;
      if (req.files && req.files.proofImg && req.files.proofImg[0]) {
        filename = req.files.proofImg[0].filename;
      }
      var request = new Request(req.body);
      request.proofImg = filename;
      request
        .save()
        .then(savedrequest => {
          res.json(savedrequest);
        })
        .catch(err => {
          res.status(404).send(err);
        });
    }
  );

  //@To delete request
  router.delete("/deleteRequest/:id",auth, (req, res) => {
    Request.findByIdAndRemove(req.params.id)
      .then(result => {
        if (fs.existsSync(`./uploads/${result.proofImg}`)) {
          fs.unlinkSync(`./uploads/${result.proofImg}`)
        }
        res.send(result);
      })
      .catch(err => res.send(err));
  });
}

module.exports = requestController;
