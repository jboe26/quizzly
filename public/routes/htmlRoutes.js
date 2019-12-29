

// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var path = require("path");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // HTML GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases the user is shown an HTML page of content
  // ---------------------------------------------------------------------------

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });
  
  app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/registration.html"));
  });

};