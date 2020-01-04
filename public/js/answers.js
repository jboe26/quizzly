$(document).ready(function () {
    console.log("ready!");


    $("#done").on("click", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        var category = document.getElementById("idQ");
        if (category === "english") {
            $('.slider').change(function () {
                $('#slider_input').val("english");
            });
        }
        else if (category === "history") {
            $('.slider').change(function () {
                $('#slider_input').val("history");
            });
        }
        else if (category === "math") {
            $('.slider').change(function () {
                $('#slider_input').val("math");
            });
        }
        else if (category === "science") {
            $('.slider').change(function () {
                $('#slider_input').val("science");
            });
        }
        else if (category === "geography") {
            $('.slider').change(function () {
                $('#slider_input').val("geography");
            });
        }
        else {
            console.log("Quiz submitted.");
        }
        // var newQuiz = {
        //     quiz: $("#slider_input").val().trim()
        // };
        // // Send the POST request.
        // $.ajax("/api/quiz", {
        //     type: "POST",
        //     data: newQuiz
        // })
    });

    var correctAnswers = 10;
    var missed = 10;
    var incorrectAnswers = 10;
    var score = 100;


    $("#next1").on("click", function (event) {
        event.preventDefault();
        $(".question1").hide();
        $(".question2").show();

    })


    $("#next2").on("click", function (event) {
        event.preventDefault();
        $(".question2").hide();
        $(".question3").show();

    })

    $("#next3").on("click", function (event) {
        event.preventDefault();
        $(".question3").hide();
        $(".question4").show();

    })

    $("#next4").on("click", function (event) {
        event.preventDefault();
        $(".question4").hide();
        $(".question5").show();

    })

    $("#next5").on("click", function (event) {
        event.preventDefault();
        $(".question5").hide();
        $(".question6").show();

    })

    $("#next6").on("click", function (event) {
        event.preventDefault();
        $(".question6").hide();
        $(".question7").show();

    })

    $("#next7").on("click", function (event) {
        event.preventDefault();
        $(".question7").hide();
        $(".question8").show();

    })

    $("#next8").on("click", function (event) {
        event.preventDefault();
        $(".question8").hide();
        $(".question9").show();

    })

    $("#next9").on("click", function (event) {
        event.preventDefault();
        $(".question9").hide();
        $(".question10").show();

    })

    $("#done").on("click", function (event) {
        // var done = document.getElementById("done");
        event.preventDefault();
        $("#done").show();
        $("#correctAnswers").show();
        $("#missed").show();
        $("#incorrectAnswers").show();
        $("#score").show();
    
        evaluateQuestion("answer1", "1");
        evaluateQuestion("answer2", "2");
        evaluateQuestion("answer3", "3");
        evaluateQuestion("answer4", "4");
        evaluateQuestion("answer5", "5");
        evaluateQuestion("answer6", "6");
        evaluateQuestion("answer7", "7");
        evaluateQuestion("answer8", "8");
        evaluateQuestion("answer9", "9");
        evaluateQuestion("answer10", "10");

        $("#correctAnswers").text("You got " + correctAnswers + " questions right.");
        $("#missed").text("You missed " + missed + " questions.");
        $("#incorrectAnswers").text("You got " + incorrectAnswers + " questions wrong.");
        $("#incorrectAnswers").text("Your score " + score + "%")

    });

})

    function evaluateQuestion(currentQuestion, rightAnswer) {

        var radioValue = $("input[name='" + currentQuestion + "']:checked").val();
        if (radioValue) {
            missed--;
        }

        if (radioValue == rightAnswer) {
            correctAnswers++;
            score += 10;
        } else {
            incorrectAnswers++;
        }



    }