//To get all GROUPS
function groupController(router) {
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
  router.post("/addgroup", (req, res) => {
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
    Group.findById(req.params.id)
      .then(group => {
        group.name = req.body.name;
        group.details = req.body.details;
        group.team = req.body.team;
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
        res.send(result);
      })
      .catch(err => res.send(res));
  });
}
module.exports = groupController;
