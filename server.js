const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();
const controller = require("./controllers/mainController");
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

app.use(bodyparser.json());

const connection= mongoose.connect('mongodb://admin:rootpass@ds119059.mlab.com:19059/restartproject');

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "HEAD", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
    credentials: true //allow setting of cookies
  })
);
app.use('/uploads', express.static('uploads'))

app.use(session({
  secret: "supersecretstring12345!",
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 60000 * 30 },
  store: new MongoStore({ mongooseConnection: mongoose.connection }) 
  //I wanted to destroy session every time when i restart server, cuz i am working with security stuffs and i should destroy it :D , so commented this one.
}));



app.use("/api", controller);

app.listen(process.env.PORT || 8000, () => {
  console.log("Listening...");
});
