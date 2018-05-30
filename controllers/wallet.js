const { check, validationResult } = require("express-validator/check");
//To get all WALLETS
function walletController(router) {
  var validations = [
    check("name")
      .not()
      .isEmpty()
      .withMessage("Name is required!")
      .isLength({ min: 2 })
      .withMessage("Name should be at least 2 letters"),
    check("group")
      .not()
      .isEmpty()
      .withMessage("Group name is reqruired!")
  ];
  router.get("/allwallets", (req, res) => {
    Wallet.find()
      .populate("group")
      .then(wallets => {
        Group.findById(wallets);
        res.json(wallets);
      })
      .catch(err => {
        res.status(404).json(err);
      });
  });
  router.get("/walletHistory", (req, res) => {
    History.find()
      .sort([["createdAt", "descending"]])
      .then(history => {
        res.json(history);
      })
      // .catch(err => {
      //   res.status(404).json(err);
      // });
  });

  //@To create WALLET
  router.post("/addwallet", validations, (req, res) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).send({ errors: errors.mapped() });
    }
    var wallet = new Wallet(req.body);
    Group.findById(req.body.group).then(groupOfWallet => {
      wallet.team = groupOfWallet.team;
      wallet
        .save()
        .then(savedWallet => {
          res.json(savedWallet);
        })
        .catch(err => {
          res.status(401).send(err);
        });
    });
  });
  //@To add money to WALLET
  router.post("/wallet/addOneCoin/:id", (req, res) => {
    Wallet.findByIdAndUpdate(req.params.id).then(wallet => {
      wallet.coins = Number(wallet.coins) + Number(req.body.amount);
      var message = `${
        req.body.amount
      } OneCoin added at ${new Date().toLocaleString()}`;
      wallet.history.push(message);
      wallet
        .save()
        .then(savedWallet => {
          const history = new History({
            event: message + " to " + savedWallet.name
          });
          history
            .save()
            .then(answ => null)
            .catch(err => console.log(err));
          res.json(savedWallet);
        })
        .catch(err => {
          res.status(401).send(err);
        });
    });
  });
  //@To take money to WALLET
  router.post("/wallet/takeOneCoin/:id", (req, res) => {
    Wallet.findByIdAndUpdate(req.params.id).then(wallet => {
      wallet.coins = Number(wallet.coins) - Number(req.body.amount);
      var message = `${
        req.body.amount
      } OneCoin subtracted at ${new Date().toLocaleString()}`;
      wallet.history.push(message);
      wallet
        .save()
        .then(savedWallet => {
          const history = new History({
            event: message + " from " + savedWallet.name
          });
          history
            .save()
            .then(answ => null)
            .catch(err => console.log(err));
          res.json(savedWallet);
        })
        .catch(err => {
          res.status(401).send(err);
        });
    });
  });
  //@one wallet for editing
  router.get("/wallet/:id", (req, res) => {
    Wallet.findById(req.params.id)
      .then(wallet => {
        Group.findById(wallet.group)
          .populate("group")
          .then(group => {
            res.json({ wallet: wallet, group: group });
          })
          .catch(err => res.status(404).json(err));
      })
      .catch(err => res.status(404).json(err));
  });
  //@one wallet by seqId
  router.get("/walletBySeqId/:id", (req, res) => {
    Wallet.findOne({ seqId: req.params.id })
      .then(wallet => {
        if (wallet) {
          Group.findById(wallet.group)
            .populate("team")
            .then(group => {
              res.json({ wallet: wallet, group: group });
            })
            .catch(err => res.status(404).json(err));
        } else {
          res.status(401).send({ error: "Wrong id, can you check it again?" });
        }
      })
      .catch(err => res.status(404).json(err));
  });

  //@To edit WALLET
  router.put("/editwallet/:id", validations, (req, res) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).send({ errors: errors.mapped() });
    }
    wallet
      .findById(req.params.id)
      .then(Wallet => {
        wallet.name = req.body.name;
        wallet.group = req.body.group;
        wallet.coins = req.body.coins;
        wallet
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

  //@To delete WALLET
  router.delete("/deletewallet/:id", (req, res) => {
    Wallet.findByIdAndRemove(req.params.id)
      .then(result => {
        res.send(result);
      })
      .catch(err => res.send(err));
  });
}
module.exports = walletController;
