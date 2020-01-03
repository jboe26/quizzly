var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var QuizSchema = new Schema({
  // `title` is of type String
  Category: String,
  
});

// This creates our model from the above schema, using mongoose's model method
var Qote = mongoose.model("Quiz", QuizSchema);

// Export the Note model
module.exports = Quiz;
