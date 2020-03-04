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
            question: "In Aladdin, what is the name of Jasmine's pet tiger?",
            choices: ["Rajah", "Bo", "Iago", "Jack"],
            images: ["../images/Rajah.gif"],
            correct: 0
        }, {
            question: "In Peter Pan, Captain Hook had a hook on which part of his     body?",
            choices: ["Right Foot", "Left Hand", "Left Foot", "Right Hand"],
            correct: 1

        }, {
            question: "In the Lion King, where does Mufasa and his family live?",
            choices: ["Rocky Mountain", "Forest", "Desert", "Pride Rock"],
            correct: 3

        }, {
            question: "In Beauty and the Beast, how many eggs does Gaston eat for    breakfast?",
            choices: ["2 Dozen", "5 Dozen", "5000", "0"],
            correct: 1

        }, {
            question: "In Alice in Wonderland, what is the name of Alice’s kitten?",
            choices: ["Dinah", "Sammie", "Kat", "Luna"],
            correct: 0

        }, {
            question: "After being on earth, where did Hercules first meet his   father Zeus?",
            choices: ["Mount Olympus", "Greece", "In the Temple of Zeus", "Elysian   Fields"],
            correct: 2

        }, {
            question: "During the ballroom scene of Beauty & the Beast, what color is Belle’s Gown?",
            choices: ["Yellow", "Blue", "Gold", "White"],
            correct: 2

        }, {
            question: "In Bambi, what word does the owl use to describe falling in love?",
            choices: ["Whimsical", "Miserable", "Joyful", "Twitterpatted"],
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