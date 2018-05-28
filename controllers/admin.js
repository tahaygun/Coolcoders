const { check, validationResult } = require("express-validator/check");
//To get all adminS
function adminController(router) {
  var validation = [
    check("username")
      .not()
      .isEmpty()
      .withMessage("Username is required!")
      .isLength({ min: 2 })
      .withMessage("Username should be at least 4 letters"),
    check("password")
      .not()
      .isEmpty()
      .withMessage("Password can not be empty!")
      .isLength({ min: 8 })
      .withMessage("Password should be at least 8 letters")
  ];
  var logvalidation = [
    check("username")
      .not()
      .isEmpty()
      .withMessage("Username is required!"),
    check("password")
      .not()
      .isEmpty()
      .withMessage("Password can not be empty!")
  ];
  router.post("/adminlogin", logvalidation, (req, res) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.mapped() });
    }
    Admin.findOne({
      email: req.body.email,
      password: req.body.password
    })
      .then(function(admin) {
        if (!admin) {
          return res.status(401).send({
            errors: {
              logError: "Wrong email or password!"
            }
          });
        } else {
          req.session.admin = admin;
          return res.send({ message: "You are signed in" });
        }

        res.send(admin);
      })
      .catch(function(error) {
        console.log(error);
      });
  });

  //@To create admin
  router.post("/addadmin", validation, (req, res) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.mapped() });
    }
    var admin = new Admin(req.body);
    admin
      .save()
      .then(savedadmin => {
        res.json(savedadmin);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  });

  //@To delete adminS
  router.delete("/deleteadmin/:id", (req, res) => {
    admin
      .findByIdAndRemove(req.params.id)
      .then(result => {
        res.send(result);
      })
      .catch(err => res.send(res));
  });

  //@to logout
  router.get("/api/logout", function(req, res) {
    req.session.destroy();
    res.send({ message: "session destroyed" });
  });
}
module.exports = adminController;
