var express = require("express");

var router = express.Router();

// Import the model (user.js) to use its database functions.
var user = require("../models/user.js");

// Send registration to DB 
router.post("/api/user", function(req, res) {
  user.insertOne([
    "Last_name", "First_name", "user_email", "user_password"
  ], [
    req.body.validationServer02, req.body.validationServer01, req.body.validationServerEmail, req.body.validationServerPassword1
  ], function(result) {
    // Send back the ID of the new user
    res.json({ id: result.insertId });
  });
});
// Create all our routes and set up logic within those routes where required.
// router.get("/", function(req, res) {
//   user.selectAll(function(data) {
//     var userObject = {
//       user: data
//     };
//     console.log("user: ", userObject);
//     res.render("index", userObject);
//   });
// });
// router.put("/api/user/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   console.log("condition", condition);
// console.log(req.body.devoured);
//   user.updateOne({
//     devoured: req.body.devoured
//   }, condition, function(result) {
//     if (result.changedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });

// router.delete("/api/burgers/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   burger.delete(condition, function(result) {
//     if (result.affectedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });

// Export routes for server.js to use.
module.exports = router;
