const { check, validationResult } = require("express-validator/check");
//To get all GROUPS
function groupController(router) {
  var validations = [
    check("name")
      .not()
      .isEmpty()
      .withMessage("Name is required!")
      .isLength({ min: 2 })
      .withMessage("Name should be at least 2 letters"),
    check("team")
      .not()
      .isEmpty()
      .withMessage("Please choose team!")
  ];
  router.get("/allgroups", (req, res) => {
    Group.find()
      .populate("team")
      .then(groups => {
        res.json(groups);
      })
      .catch(err => {
        res.status(404).json(err);
      });
  });

  //@To create GROUP
  router.post("/addgroup", validations, (req, res) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).send({ errors: errors.mapped() });
    }
    var group = new Group(req.body);
    group
      .save()
      .then(savedgroup => {
        res.json(savedgroup);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  });

  //@one group for editing
  router.get("/group/:id", (req, res) => {
    Group.findById(req.params.id)
      .populate("team")
      .then(group => {
        res.json(group);
      })
      .catch(err => res.status(404).json(err));
  });
  //@To edit GROUP
  router.put("/editgroup/:id", (req, res) => {
    Group.findByIdAndUpdate(req.params.id)
      .then(group => {
        group.name = req.body.name;
        group
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

  //@To delete GROUP
  router.delete("/deletegroup/:id", (req, res) => {
    Group.findByIdAndRemove(req.params.id)
      .then(result => {
        Wallet.remove({ group: req.params.id })
          .then(resp => res.send(resp))
          .catch(err => res.send(err));
      })
      .catch(err => res.send(err));
  });
}
module.exports = groupController;
