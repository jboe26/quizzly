var orm = require("../config/orm.js");

var burger = {
    selectAll: function(cb) {
      orm.selectAll("user", function(res) {
        cb(res);
      });
    },
    // The variables cols and vals are arrays.
    insertOne: function(cols, vals, cb) {
      orm.insertOne("user", cols, vals, function(res) {
        cb(res);
      });
    },
    updateOne: function(objColVals, condition, cb) {
      orm.updateOne("user", objColVals, condition, function(res) {
        cb(res);
      });
    },
    // delete: function(condition, cb) {
    //   orm.delete("user", condition, function(res) {
    //     cb(res);
    //   });
    // }
  };
  
  // Export the database functions for the controller (user_controller.js).
  module.exports = user;