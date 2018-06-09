const { check, validationResult } = require("express-validator/check");
const fs = require("fs");
//To get all TEAMS
function teamController(router, upload,auth) {
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
      .withMessage("Details should be at least 2 letters")
  ];
  router.get("/allteams", (req, res) => {
    Team.find()
      .then(teams => {
        res.json(teams);
      })
      .catch(err => {
        res.status(404).json(err);
      });
  });

  //@To create TEAM
  router.post(
    "/addteam",
    upload.fields([{ name: "imgUrl", maxCount: 1 }]),auth, //multer files uploadvalidations,
    (req, res) => {
      var errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(500).send({ errors: errors.mapped() });
      }
      var filename = null;
      if (req.files && req.files.imgUrl && req.files.imgUrl[0]) {
        filename = req.files.imgUrl[0].filename;
      }
      var team = new Team(req.body);
      team.imgUrl = filename;
      team
        .save()
        .then(savedteam => {
          res.json(savedteam);
        })
        .catch(err => {
          res.status(404).send(err);
        });
    }
  );
  //@to get one team
  router.get("/team/:id", (req, res) => {
    Team.findById(req.params.id)
      .then(team => {
        res.json(team);
      })
      .catch(err => res.status(404).json(err));
  });

  var oldImg = "";
  //@To edit TEAM
  router.put(
    "/editteam/:id",
    upload.fields([{ name: "imgUrl", maxCount: 1 }]),auth,
    validations,
    (req, res) => {
      var errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(500).send({ errors: errors.mapped() });
      }
      Team.findById(req.params.id)
        .then(team => {
          team.name = req.body.name;
          team.details = req.body.details;
          if (req.files.imgUrl) {
            oldImg = team.imgUrl; //we store path of old image to delete it later
            team.imgUrl = req.files.imgUrl[0].filename;
            if (fs.existsSync(`./uploads/${oldImg}`)) {
              fs.unlinkSync(`./uploads/${oldImg}`)
            }
          }
          team
            .save()
            .then(result => {
              res.send(result);
            })
            .catch(err => res.send(res));
        })
        .catch(err => {
          res.status(404).send(err);
        });
    }
  );

  //@To delete TEAM
  router.delete("/deleteteam/:id",auth, (req, res) => {
    Team.findByIdAndRemove(req.params.id)
      .then(result => {
        if (fs.existsSync(`./uploads/${result.imgUrl}`)) {
          fs.unlinkSync(`./uploads/${result.imgUrl}`)
        }
        Group.remove({ team: req.params.id })
          .then(result => {
            Wallet.remove({ team: req.params.id }).exec()
          })
          .cath(err => res.send(err));
      })
      .catch(err => res.send(err));
  });
}

module.exports = teamController;
