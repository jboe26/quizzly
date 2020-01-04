$(function() {
    $("#register").on("click", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
    
        var newUser = {
          First_name: $("#firstname").val().trim(),
          Last_name: $("#lastname").val().trim(),
          user_email: $("#email").val().trim(),
          username:$("#username").val().trim(),
          user_password:$("#password").val().trim()
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