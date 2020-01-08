$("#registerBtn").on("click", function (event) {
  // Make sure to preventDefault on a submit event.
  event.preventDefault();
  // clear inputs
  var data = {}
  data.firstname = $("#firstname").val();
  data.lastname = $("#lastname").val();
  data.email = $("#email").val();
  data.username = $("#username").val();
  data.password = $("#password").val();

  $.ajax({
    type: "POST",
    url: "/register",
    data: data
  }).then(function (res) {
    $("#firstname").val("");
    $("#lastname").val("");
    $("#email").val("");
    $("#username").val("");
    $("#password").val("");
    $("#password2").val("");
    console.log('registered')
    console.log(res)
    // res.sendFile('main.html')

  }).catch(function (err) {
    // On error sends to main page anyway for demo purposes
    window.location.replace("/main.html");
    // console.log('not getting user or wrong credentials')
  })

});