const express = require("express");
const router = express.Router();
const session = require("express-session");
const Product = require("../models/Product");
const Wallet = require("../models/Wallet");
const Team = require("../models/Team");
const Group = require("../models/Group");
const productController = require('./product')
const teamController = require('./team')
const groupController = require('./group')
const walletController = require('./wallet')
//chechk auth
var auth = (req, res, next) => {
  if (req.session.admin) {
    Admin.findOne({
      email: req.session.admin.email,
      password: req.session.admin.password
    })
      .then(function(admin) {
        if (!admin) {
          return res.status(401).json();
        } else {
          req.session.admin = admin;
          return next();
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  } else {
    return res.status(401).send({ errors: "Not authorized!" });
  }
};

productController(router);
teamController(router);
groupController(router);
walletController(router);

module.exports = router;
