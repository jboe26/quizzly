$(function () {

    $("#register").on("click", function (event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
      // clear inputs
      $("#username").val("");
      $("#password").val("");
    });

});