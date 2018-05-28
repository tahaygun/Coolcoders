const { check, validationResult } = require("express-validator/check");
//To get all TEAMS
function teamController(router) {
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
  router.post("/addteam",validations, (req, res) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).send({ errors: errors.mapped() });
    }
    var team = new Team(req.body);
    team
      .save()
      .then(savedteam => {
        res.json(savedteam);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  });

  //@To edit TEAM
  router.put("/editteam/:id",validations, (req, res) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).send({ errors: errors.mapped() });
    }
    Team.findById(req.params.id)
      .then(group => {
        team.name = req.body.name;
        team.details = req.body.details;
        team.imgUrl = req.body.imgUrl;
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
  });

  //@To delete TEAM
  router.delete("/deleteteam/:id", (req, res) => {
    Team.findByIdAndRemove(req.params.id)
      .then(result => {
        res.send(result);
      })
      .catch(err => res.send(err));
  });
}

module.exports = teamController;
