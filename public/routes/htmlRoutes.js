

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
    res.sendFile(path.join(__dirname, "../index.html"));
  });

app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../login.html"));
  });
  
  app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../registration.html"));
  });

  app.get("/english", function(req, res) {
    res.sendFile(path.join(__dirname, "../english.html"));
  });

  app.get("/math", function(req, res) {
    res.sendFile(path.join(__dirname, "../math.html"));
  });

  app.get("/science", function(req, res) {
    res.sendFile(path.join(__dirname, "../science.html"));
  });

  app.get("/geography", function(req, res) {
    res.sendFile(path.join(__dirname, "../geography.html"));
  });

  app.get("/history", function(req, res) {
    res.sendFile(path.join(__dirname, "../history.html"));
  });

};