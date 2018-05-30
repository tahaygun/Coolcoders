const express = require("express");
const router = express.Router();
const path = require("path");
const session = require("express-session");
const multer = require("multer");
const { check, validationResult } = require("express-validator/check");
const Item = require("../models/Item");
const Wallet = require("../models/Wallet");
const Team = require("../models/Team");
const Group = require("../models/Group");
const Request = require("../models/Request");
const Admin = require("../models/Admin");
const Coupon = require("../models/Coupon");
const itemController = require("./item");
const teamController = require("./team");
const groupController = require("./group");
const walletController = require("./wallet");
const requestController = require("./request");
const adminController = require("./admin");
const couponController = require("./coupon");
var mime = require("mime-types");

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

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.resolve(__dirname, "../uploads"));
  },
  filename: function(req, file, cb) {
    const extension = mime.extension(file.mimetype);
    const filename = file.originalname + "-" + Date.now().toString();
    cb(null, filename + "." + extension);
  }
});

//this is for uploading photo
var upload = multer({ storage: storage });

itemController(router, upload);
teamController(router,upload);
groupController(router);
walletController(router);
requestController(router,upload);
adminController(router);
couponController(router);
module.exports = router;
