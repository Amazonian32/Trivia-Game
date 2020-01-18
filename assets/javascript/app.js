var answerKey = [{
    1: [{ "black": true, "blue": false, "pink": false, "green": false }],
    2: [{ "Gale": false, "Lynn": false, "Marie": true, "sky": false }],
    3: [{ "neverending": false, "short": true, "nothing": false, "all of them": false }]
}];


let index = 0;

var answerQ = [
    
         "What is my favorite color?",
         "What is my middle name?",
         "What word becomes shorter when you add two letters to it?"
    ];
var questions = answerQ
var answers = [answerKey[1], answerKey[2], answerKey[3]];

$(document).ready(function () {

    function testTime() {
        for (let i = 0; i < answerKey.length; i++) {
            console.log(answerKey[i])
            // console.log(questions[i]);

        }
    }

    testTime();
    function askQuestion() {

        if (index <= (questions.length - 1)) {
            for (let i = 0; i < questions.length; i++) {
                var currentQ = $("<h2>")
                currentQ.text(questions[i])
                console.log(questions[i]);

                $("#question").append(currentQ);
            }
            

        } else {
            console.log("GAME OVER");
            $("#timer").empty();
            $("#question").empty();
        }
        function multipleChoice() {
            for (let i = 0; i < answers.length; i++) {
                console.log(answers[i]);
                var choices = $("<button>")
                choices.text(answers[i]).attr("id", answers[i]);
                $("#choices").append(choices);
            }


            $("button").on("click", function (event) {
                console.log("clicked: " + $(this).attr("id"));
                choices = $(this).attr("id");
                function grade() {
                    if (choices == answerKey[index].a) {
                        console.log("HOORAH");
                    } else {
                        console.log("BOO");
                    }

                }
                grade();

            })
        }

        multipleChoice();
    }

    askQuestion();


});