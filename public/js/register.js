$(function () {

  $("#register").on("click", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    // clear inputs
    $("#firstname").val("");
    $("#lastname").val("");
    $("#email").val("");
    $("#username").val("");
    $("#password").val("");
  });

});