var express = require("express");
// var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
const mysql = require('mysql');
var PORT = process.env.PORT || 3000;

// Requiring our models for syncing
// var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
// require("./public/routes/htmlRoutes.js")(app,path);
// Import routes and give the server access to them.
var routes = require("./controllers/user_controller.js");

app.use(routes);

// Syncing our sequelize models and then starting our Express app
// =============================================================
// db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

// =============================================================
$(function() {
  $("#submit").on("click", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  
      var newUser = {
        First_name: $("#validationServer01").val().trim(),
        Last_name: $("#validationServer02").val().trim(),
        email: $("#validationServerEmail").val().trim()
      };
  
      // Send the POST request.
      $.ajax("/api/user", {
        type: "POST",
        data: newUser
      }).then(
        function() {
          console.log("created new user");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  });