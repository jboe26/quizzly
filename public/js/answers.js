$(document).ready(function () {
    console.log("ready!");

    var correctAnswers = 0;
    var missed = 0;
    var incorrectAnswers = 0;
    var score = 0;

    $("#next1").on("click", function (event) {
        event.preventDefault();
        $(".question1").hide();
        $(".question2").show();
    });

    $("#next2").on("click", function (event) {
        event.preventDefault();
        $(".question2").hide();
        $(".question3").show();

    });

    $("#next3").on("click", function (event) {
        event.preventDefault();
        $(".question3").hide();
        $(".question4").show();
    });

    $("#next4").on("click", function (event) {
        event.preventDefault();
        $(".question4").hide();
        $(".question5").show();
    });

    $("#next5").on("click", function (event) {
        event.preventDefault();
        $(".question5").hide();
        $(".question6").show();
    });

    $("#next6").on("click", function (event) {
        event.preventDefault();
        $(".question6").hide();
        $(".question7").show();
    });

    $("#next7").on("click", function (event) {
        event.preventDefault();
        $(".question7").hide();
        $(".question8").show();
    });

    $("#next8").on("click", function (event) {
        event.preventDefault();
        $(".question8").hide();
        $(".question9").show();
    });

    $("#next9").on("click", function (event) {
        event.preventDefault();
        $(".question9").hide();
        $(".question10").show();
    });

    $("#done").on("click", function (event) {
        event.preventDefault();
        $(".question10").hide();
        $(".result").show();
        // set values for post requests
        var category = document.getElementById(idQ).value;
        $('.slider').change(function () {
            $('#slider_input').val(category);
        });

        var grade = document.getElementById(score);
        $('.hidden').change(function () {
            $('#score_input').val(grade);
        });

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

        cA = document.getElementById("correctAnswers");
        catxt = document.createTextNode("You got " + correctAnswers + " questions right.");
        cA.appendChild(catxt);

        iA = document.getElementById("incorrectAnswers");
        iatxt = document.createTextNode("You got " + incorrectAnswers + " questions wrong.");
        cA.appendChild(iatxt);

        mTotal = document.getElementById("missed");
        mtxt = document.createTextNode("You missed " + missed + " questions.");
        mTotal.appendChild(mtxt);

        scoreT = document.getElementById("score");
        scoretxt = document.createTextNode("Your score " + score + "%");
        scoreT.appendChild(scoretxt);

    });
    function evaluateQuestion(currentQuestion, rightAnswer) {
        var radioValue = $("input[name='" + currentQuestion + "']:checked").val();
        if (radioValue != rightAnswer) {
            missed++;
            incorrectAnswers++;
        } else {
            correctAnswers++;
            score += 10;
        };
    };
});
