const express = require("express");
const router = express.Router();
const path = require('path');
const session = require("express-session");
var multer = require('multer');

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

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.resolve(__dirname, 'uploads'))
//   },
//   filename: function (req, file, cb) {
//     const extension = mime.extension(file.mimetype);
//     const filename = file.originalname +'-'+ Date.now().toString();
//     cb(null, filename + '.' + extension)
//   }
// })

// //this is for uploading photo
// var upload = multer({ storage: storage });


productController(router);
teamController(router);
groupController(router);
walletController(router);

module.exports = router;
