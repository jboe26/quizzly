$(document).ready(function () {
    console.log("ready!");

    $("#done").hide();



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

    $("#next1").on("click", function(event) {
        event.preventDefault();
        $(".question1").hide();
        
        $(".question2").show();
        
    })


    $("#next2").on("click", function(event) {
        event.preventDefault();
        $(".question2").hide();
        $(".question3").show();
        
    })

    $("#next3").on("click", function(event) {
        event.preventDefault();
        $(".question3").hide();
        $(".question4").show();
        
    })

    $("#next4").on("click", function(event) {
        event.preventDefault();
        $(".question4").hide();
        $(".question5").show();
        
    })

    $("#next5").on("click", function(event) {
        event.preventDefault();
        $(".question5").hide();
        $(".question6").show();
        
    })

    $("#next6").on("click", function(event) {
        event.preventDefault();
        $(".question6").hide();
        $(".question7").show();
        
    })

    $("#next7").on("click", function(event) {
        event.preventDefault();
        $(".question7").hide();
        $(".question8").show();
        
    })

    $("#next8").on("click", function(event) {
        event.preventDefault();
        $(".question8").hide();
        $(".question9").show();
        
    })

    $("#next9").on("click", function(event) {
        event.preventDefault();
        $(".question9").hide();
        $(".question10").show();
        
    })

    $("#next10").on("click", function(event) {
        event.preventDefault();
        $(".question10").hide();
        $("#done").show();
        $("#correctAnswers").show();
        $("#missed").show();
        $("#incorrectAnswers").show();

    })
    
    var correctAnswers = 0;
    var missed = 10;
    var incorrectAnswers = 0;
    
   



<<<<<<< HEAD:public/js/answers.js
        evaluateQuestion("answer1", "a");
        evaluateQuestion("answer2", "b");
        evaluateQuestion("answer4", "c");
        evaluateQuestion("answer5", "d");
        evaluateQuestion("answer6", "e");
        evaluateQuestion("answer7", "a");
        evaluateQuestion("answer8", "b");
        evaluateQuestion("answer9", "c");
        evaluateQuestion("answer10", "d");

=======
    $("#done").click(function () {
        // $(".questions").hide();
        
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
>>>>>>> 40c30125b363ff7b84efb66bfcec305fce660343:public/answers.js

        $("#correctAnswers").text("You got " + correctAnswers + " questions right.");
        $("#missed").text("You missed " + missed + " questions.");
        $("#incorrectAnswers").text("You got " + incorrectAnswers + " questions wrong.");
        $("#incorrectAnswers").text("Your score " + score + "%")

    });


    
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