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
        
        $(".question10").hide();
        $("#result").show();
        // set values for post requests
       
        var category = document.getElementById(idQ);
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
    // These variables haven't been declared
    // We need to tell them what they are getting from the user and the correct answer
    // // var rightAnswer = document.getElementById(this.correct) or something like this
    // This has to be ran on every question unless answers bc we are not doing form submit.
    // https://stackoverflow.com/questions/9618504/how-to-get-the-selected-radio-button-s-value
     var rightAnswer = document.getElementsByName().value
    var userAnswer = document.getElementsByName('answers10');
    for (var i = 0; i < userAnswer.length; i++) {
        if (userAnswer[i].checked && rightAnswer) {
          // do whatever you want with the checked radio
          alert(radios[i].value);
      
          // only one radio can be logically checked, don't check the rest
          break;
        }
      }
    // It's late and I'm too tired to fool with this. 
    // We need to set a loop to get the current question and check if the users "checked" and value are the same 
    // this function has to be ran on each question
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
