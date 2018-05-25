const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();
const controller = require("./controllers/mainController");
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

app.use(bodyparser.json());

mongoose.connect('mongodb://admin:rootpass@ds119059.mlab.com:19059/restartproject');
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
}));



app.use("/api", controller);

app.listen(process.env.PORT || 8000, () => {
  console.log("Listening...");
});
