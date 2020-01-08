$("#loginBtn").on("click", function (event) {
  // Make sure to preventDefault on a submit event.
  event.preventDefault();
  var data = {}
  data.email = $("#email").val();
  data.password = $("#password").val();

  $.ajax({
    type: "POST",
    url: "/login",
    data: data
  }).then(function (res) {
    $("#username").val("");
    $("#password").val("");

    console.log('logigng in')
    console.log(res)
    // res.sendFile('main.html')

  }).catch(function(err) {
    // On error sends to main page anyway for demo purposes
    window.location.replace("/main.html");
    // console.log('not getting user or wrong credentials')
  })
});