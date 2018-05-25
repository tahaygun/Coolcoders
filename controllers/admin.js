//To get all adminS
function adminController(router) {
  router.post("/adminlogin", (req, res) => {
    Admin.findOne({
      email: req.body.email,
      password: req.body.password
    })
      .then(function(admin) {
        if (!admin) {
          return res.status(401).send({ errors: "Wrong email or password!" });
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
  router.post("/addadmin", (req, res) => {
    var admin = new Admin(req.body);
    admin
      .save()
      .then(savedadmin => {
        res.json(savedadmin);
      })
      .catch(err => {
        res.status(404).send(err);
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
  router.get('/api/logout', function (req, res) {
    req.session.destroy();
    res.send({ message: 'session destroyed' })
  });
}
module.exports = adminController;
