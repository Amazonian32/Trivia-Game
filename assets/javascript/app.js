
var quizQuestions = [
    { q: "The sky is blue.", a: "t"  },
    { q: "There are 365 days in a year.", a: "t" },
    { q: "There are 42 ounces in a pound.", a: "f" },
    { q: "The Declaration of Independence was created in 1745.", a: "f" },
    { q: "Bananas are vegetables.", a: "f" }
]

var quizAnswers = [
    {a: "t", b: "f", c: "f", d: "f"}
];

let index = 0

let choices = quizAnswers.length[index]

for (let i = 0; i < quizQuestions.length; i++) {
    console.log(quizQuestions[i]);
    
}
for (let j = 0; j < quizAnswers.length; j++) {
    console.log(quizAnswers[j]);

    
}

$(document).ready(function () {

    function askQuestion() {
        if (index <= (quizQuestions.length - 1)) {
            var currentQ = $("<h2>").text(quizQuestions[index].q)
            console.log(currentQ[0], quizQuestions[index].a);
            $("#question").prepend(currentQ);
        }else{
            console.log("GAME OVER");
            $("#timer").empty();
            $("#question").empty();
        }
        function multipleChoice(){

        }

       
    }
    
    askQuestion();
})