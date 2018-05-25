//To get all TEAMS
function teamController(router) {
    
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
  router.post("/addteam", (req, res) => {
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
  router.put("/editteam/:id", (req, res) => {
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
    .catch(err => res.send(res));
});
}

module.exports = teamController;