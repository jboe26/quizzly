var express = require("express");
var path = require("path");

var PORT = process.env.PORT || 3000;

var app = express();
const mysql = require('mysql');

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTER
// The below points our server to a series of "route" files.
// require("./routing/....Routes.js")(app, path);
// require("./routing/....Routes.js")(app, path);

app.get("/login", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

app.get("/signup", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/registration.html"));
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});