$(function() {
    $("#submit").on("click", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
    
        var newUser = {
          First_name: $("#validationServer01").val().trim(),
          Last_name: $("#validationServer02").val().trim(),
          user_email: $("#validationServerEmail").val().trim(),
          user_password:$("validationServerPassword1").val().trim()
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