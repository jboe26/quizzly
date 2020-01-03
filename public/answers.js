$(document).ready(function () {
    console.log("ready!");


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

    })
    
    var correctAnswers = 0;
    var missed = 5;
    var incorrectAnswers = 0;
    var intervalID = null;
   



    $("#done").click(function () {
        $(".questions").hide();
        
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
        $("#incorrectAnswers").text("You got " + incorrectAnswers + " questions wrong.")
    });


    function count() {
        $(".timer").text("You have " + time + " seconds remaining.");
        time--;

        
    }

    function evaluateQuestion(currentQuestion, rightAnswer) {

        var radioValue = $("input[name='" + currentQuestion + "']:checked").val();
        if (radioValue) {
            missed--;
        }

        if (radioValue == rightAnswer) {
            correctAnswers++;
        } else {
            incorrectAnswers++;
        }



    }
});