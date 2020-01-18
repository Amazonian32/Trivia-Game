
// var quizQuestions = [
//     { q: "The sky is blue.", a: "t" },
//     { q: "There are 365 days in a year.", a: "t" },
//     { q: "There are 42 ounces in a pound.", a: "f" },
//     { q: "The Declaration of Independence was created in 1745.", a: "f" },
//     { q: "Bananas are vegetables.", a: "f" }
// ]
var questions = ["The sky is blue.", "There are 365 days in a year.", "There are 42 ounces in a pound.", "The Declaration of Independence was created in 1745.", "Bananas are vegetables."]

// var quizAnswers = [
//     { a: "t", b: "f", c: "f", d: "f" }
// ];
var answers = ["t", "f"]

let index = 0

// let choices = quizAnswers.length[index]

$(document).ready(function () {

    function askQuestion() {

        if (index <= (questions.length - 1)) {
            for (let i = 0; i < questions.length; i++) {
                var currentQ = $("<h2>")
                currentQ.text(questions[i])
                console.log(questions[i]);
            }
            $("#question").append(currentQ);

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

        }

        multipleChoice();
    }

    askQuestion();

    $("button").on("click", function (event) {
        console.log("clicked: " + $(this).attr("id"));

    })

});