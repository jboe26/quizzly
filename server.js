var express = require("express");
// var path = require("path");
var mongoose = require("mongoose");
// var models = require('./models');
// var db = require("/models");
// Sets up the Express App
// =============================================================
var PORT = process.env.PORT || 3000;
var app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);


// Routes
// =============================================================

  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
