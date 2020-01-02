$(document).ready(function () {
    console.log("ready!");


    var correctAnswers = 0;
    var missed = 5;
    var incorrectAnswers = 0;
    var intervalID = null;
   

    //create a function to hide the start button when clicked
    $("#startButton").click(function () {
        //Declare variable to hold setInterval timer
        intervalID = setInterval(count, 1000);
        $("#startButton").hide();


        $(".questions").hide();
        $(".questions").show();



    });

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