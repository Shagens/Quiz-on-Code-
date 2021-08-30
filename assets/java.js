const startButton = document.getElementById('start-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const gameTimerEl = document.getElementById('Timer')
const nextButton = document.getElementById('next-btn')
const saveButton = document.getElementById('save-btn')
const answerButtonsEl = document.getElementById('answer-btn')
const finishButtonEl = document.getElementById('finish-btn')

var userInitials;
var score = 0
var timer = 90;
var allScores = []

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion()
})

saveButton.addEventListener('click', topScores);

function startGame() {
    console.log('started')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide');
    showQuestion();
    gameTimer();
}

function gameTimer() {
    var countDown = setInterval(function() {
        timer --;
        document.getElementById('timer').innerText = timer;
        if (timer <=0) {
            clearInterval(countDown);
            nextButton.classList.add('hide');
            gameOver();
        }
    }, 1000);
}

function setNextQuestion () {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question

    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener('click', selectAnswer)
        answerButtonsEl.appendChild(button);
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide');
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild);
    }
    clearStatusClass(document.body);
    Array.from(answerButtonsEl.children).forEach(button => {
        button.disabled = false;
    })
}
function selectAnswer() {
    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.classList.contains('right')) {
            button.classList.remove('right');
        }
        if (button.classList.contains('wrong')) {
            button.classList.remove('wrong');
        }
    })
    
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, right);
    setStatusClass(selectedButton, right)
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
        Array.from(answerButtonsElement.children).forEach(button => {
            button.disabled = true;
        })

        finishButtonEl.addEventListener('click', gameOver)
    }
}


const questions = [
    {
        question: 'What does HTML stand for?',
        answers: [
            { text: 'Hyper Text Markup Language', correct: true},
            { text: 'Hyper Type Makeup Language', correct: false},
            { text: 'Happy To Make Language', correct: false},
            { text: 'Hyper Text Makeup Language', correct: false}

        ]
    },
    {
        question: 'What does CSS stand for?',
        answers: [
            { text: 'Cake Sweets Short', correct: false},
            { text: 'Cascading Sheet Sets', correct: false},
            { text: 'Cascading Style Sheets', correct: true},
            { text: 'Cascading Style Sets', correct: false}

        ]
    },
    {
        question: 'What is 8+8?',
        answers: [
            { text: '11', correct: false},
            { text: '16', correct: true},
            { text: '17', correct: false},
            { text: '15', correct: false}

        ]
    },
    {
        question: 'What does USA stand for?',
        answers: [
            { text: 'United States of Alaska', correct: false},
            { text: 'United States of Arizona', correct: false},
            { text: 'United States of Alabama', correct: false},
            { text: 'United States of America', correct: true}

        ]
    }
]

function gameOver() {
    document.getElementById('question-container').classList.add('hide');
    document.getElementById('right-wrong').classList.add('hide');
    finishButton.classList.add('hide');
    clearStatusClass(document.body);
    document.getElementById('finish-container').classList.remove('hide')
    document.getElementById('score').innerText = score;
}

function topScores(event) {
    event.preventDefault();
    userInitials = initialsEl.value;
    scorePage(userInitials, score);
    document.getElementById('finish-container').classList.add('hide');
    document.getElementById('topscores').classList.remove('hide');
    restartButton.addEventListener('click', function() {
        document.getElementById('topscores').classList.add('hide');
        location.reload();
    })
    topScoresButton.addEventListener('click', function() {
        localStorage.clear();
        document.getElementById('clear').innerText = 'Scores are Cleared'
    })
}

function scorePage(x, y) {
    var userData = {
        initials: x,
        scores: y
    };
}

function displayScores() {
    var storedScores=JSON.parse(localStorage.getItem('userData'));
    if (storedScores !== null) {
        var scoreList = document.createElement('ol');
        for (var i=0; i < storedScores.length; i++) {
            var myInitials = storedScores[i].initials;
            var myScore = storedScores[i].scores;
            var scoreEntry = document.createElement('li');
            scoreEntry.innerHTML = myInitials + " - " + myScore;
            scoreList.appendChild(scoreEntry);
        }
        highScoreArea.appendChild(scoreList);
    }
}



