$(document).ready(function () {
    $.fn.trivia = function () {
        var _t = this;
        _t.userPick = null;
        _t.answers = {
            correct: 0,
            incorrect: 0
        };
        _t.images = null;
        _t.count = 30;
        _t.current = 0;
        _t.questions = [{
            question: "What word becomes shorter by adding two more letters?",
            choices: ["Short", "Smile", "Long", "Stack"],
            correct: 0
        }, {
            question: "Before Mt. Everest was discovered, which was the highest mountain in the world?",
            choices: ["Mtn Dew", "Mt. Everest", "Mt. Helen", "Mt. Fuji"],
            correct: 1

        }, {
            question: "How long is the answer to this question?",
            choices: ["2 Hours", "50 Feet", "Miles", "How Long"],
            correct: 3

        }, {
            question: "Divide 50 by half, and add 20",
            choices: ["45", "120", "22", "None of the above"],
            correct: 1

        }, {
            question: "What has a mouth but can't chew",
            choices: ["River", "No-Mouth Man", "Bugs", "Nothing"],
            correct: 0

        }, {
            question: "I go through towns and hills, but I never move. Who am I?",
            choices: ["Everything", "Air", "Road", "Animals"],
            correct: 2

        }, {
            question: "Forward I'm heavy, but backwards I'm not. What Am I?",
            choices: ["Matter", "Elephant", "Ton", "Truck"],
            correct: 2

        }, {
            question: "what word of five letters has only one left when two letters are removed",
            choices: ["Car", "Sky", "Nothing", "Stone"],
            correct: 3
        }];
        _t.ask = function () {
            if (_t.questions[_t.current]) {
                $("#timer").html("Time remaining: " + "00:" + _t.count + " secs");
                $("#question_div").html(_t.questions[_t.current].question);
                var choicesArr = _t.questions[_t.current].choices;
                var buttonsArr = [];

                for (var i = 0; i < choicesArr.length; i++) {
                    var button = $('<button>');
                    button.text(choicesArr[i]);
                    button.attr('data-id', i);
                    button.attr("class", "btn btn-lg")
                    $('#choices_div').append(button);
                }
                window.triviaCounter = setInterval(_t.timer, 1000);
            } else {
                $('#results').append($('<div />', {
                    text: 'Unanswered: ' + (
                        _t.questions.length - (_t.answers.correct + _t.answers.incorrect)),
                    class: 'result'
                }));
                $('#start_button').text('Restart').appendTo($("#results")).show();
                _t.reward();
            }
        };
        _t.reward = function () {
            let sticker = $("<img>").attr("class", "sticker")
            if (_t.answers.correct < _t.answers.incorrect) {
                $("#images_div").prepend(sticker.attr("src", "assets/images/sad.gif"));
            } else {
                $("#images_div").prepend(sticker.attr("src", "assets/images/ducky.gif"));
            }
        }
        _t.timer = function () {
            _t.count--;
            if (_t.count <= 0) {
                setTimeout(function () {
                    _t.nextQ();
                });

            } else {
                $("#timer").html("Time remaining: " + "00:" + _t.count + " secs");
            }
        };
        _t.nextQ = function () {
            _t.current++;
            clearInterval(window.triviaCounter);
            _t.count = 30;
            $('#timer').html("");
            setTimeout(function () {
                _t.cleanUp();
                _t.ask();
            }, 1000)
        };
        _t.cleanUp = function () {
            $('div[id]').each(function (item) {
                $(this).html('');
            });
            $('.correct').html('Correct answers: ' + _t.answers.correct);
            $('.incorrect').html('Incorrect answers: ' + _t.answers.incorrect);
        };
        _t.answer = function (correct) {
            var string = correct ? 'correct' : 'incorrect';
            _t.answers[string]++;
            $('.' + string).html(string + ' answers: ' + _t.answers[string]);
        };
        return _t;
    };
    var Trivia;

    $("#start_button").click(function () {
        // console.log($(this))
        $(this).hide();
        $('.result').remove();
        $(".sticker").remove();
        Trivia = new $(window).trivia();
        Trivia.ask();
    });

    var duckyImage = $("<img>")
    duckyImage.attr("src", "assets/images/happy.png")
    var suckyImage = $("<img>")
    suckyImage.attr("src", "assets/images/nope.jpg")

    $('#choices_div').on('click', 'button', function (e) {
        var userPick = $(this).data("id"),
            _t = Trivia || $(window).trivia(),
            index = _t.questions[_t.current].correct,
            correct = _t.questions[_t.current].choices[index];

        if (userPick !== index) {
            $('#choices_div').text("Wrong Answer! The correct answer was: " + correct);
            $("#images_div").prepend(suckyImage)
            _t.answer(false);
        } else {
            $('#choices_div').text("Correct!!! The correct answer was: " + correct);
            $("#images_div").prepend(duckyImage)
            _t.answer(true);
        }
        _t.nextQ();
    });
});