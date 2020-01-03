$(document).ready(function () {
    console.log("ready!");



    $("#doneButton").on("click", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        var category = docment.getElementById(idQ);
        if (category === "english") {
            $('.slider').change(function () {
                $('#slider_input').val("English");
            });
        }
        else if (category === "history") {
            $('.slider').change(function () {
                $('#slider_input').val("History");
            });
        }
        else if (category === "math") {
            $('.slider').change(function () {
                $('#slider_input').val("Math");
            });
        }
        else if (category === "science") {
            $('.slider').change(function () {
                $('#slider_input').val("Science");
            });
        }
        else if (category === "geography") {
            $('.slider').change(function () {
                $('#slider_input').val("Geography");
            });
        }
        else {
            console.log("Not grabbing quiz id.")
        }
        var newQuiz = {
            quiz: $("#slider_input").val().trim()
        };
        // Send the POST request.
        $.ajax("/api/quiz", {
            type: "POST",
            data: newQuiz
        })
    });

    var correctAnswers = 0;
    var missed = 5;
    var incorrectAnswers = 0;
    var score = 0;
    var intervalID = null;
    //Declare variable equal to the start time
    var time = 10;



    //create a function to hide the start button when clicked
    $("#startButton").click(function () {
        //Declare variable to hold setInterval timer
        intervalID = setInterval(count, 1000);
        $("#startButton").hide();


        $(".questions").hide();
        $(".questions").show();



    });

    $("#doneButton").click(function () {
        $(".questions").hide();
        clearInterval(intervalID);


        evaluateQuestion("answer1", "a");
        evaluateQuestion("answer2", "b");
        evaluateQuestion("answer4", "c");
        evaluateQuestion("answer5", "d");
        evaluateQuestion("answer6", "e");
        evaluateQuestion("answer7", "a");
        evaluateQuestion("answer8", "b");
        evaluateQuestion("answer9", "c");
        evaluateQuestion("answer10", "d");


        $("#correctAnswers").text("You got " + correctAnswers + " questions right.");
        $("#missed").text("You missed " + missed + " questions.");
        $("#incorrectAnswers").text("You got " + incorrectAnswers + " questions wrong.");
        $("#incorrectAnswers").text("Your score " + score + "%")

    });


    function count() {
        $(".timer").text("You have " + time + " seconds remaining.");
        time--;

        if (time < 0) {
            $("#start").hide();
            $("#doneButton").click();

        }
    }

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
});