$(document).ready(function () {
    console.log("ready!");


    var correctAnswers = 0;
    var missed = 5;
    var incorrectAnswers = 0;
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
        $("#incorrectAnswers").text("You got " + incorrectAnswers + " questions wrong.")
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
        } else {
            incorrectAnswers++;
        }



    }
});