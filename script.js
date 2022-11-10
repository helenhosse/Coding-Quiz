var timerEl = document.getElementById('timer');

var startEl = document.getElementById('start-quiz')
var quizEl = document.getElementById('quiz-container')
var questionContainerEl = document.getElementById('question-container')
var answerButtonsEl = document.getElementById('answer-buttons')
var questionDisplay = document.getElementById('question-display')

var button1 = document.getElementById('btn-1');
var button2 = document.getElementById('btn-2');
var button3 = document.getElementById('btn-3');
var button4 = document.getElementById('btn-4');
var correctAnswer = document.getElementById('correctAnswer');

var index = 0;
var initialScore = 0;
var timeLeft = 75;

var totalScore = document.getElementById('totalScore');
var highScoresEl = document.getElementById('highScores');
var scoresEl = document.getElementById('scores');
var submitScores = document.getElementById('submitScores');
var highScoresListEl = document.getElementById('highScoresList');

var questions = [
    {
        question: "Commonly used data types DO NOT include which of the following:"
        answers: ["1. Strings", "2. Booleans", "3. Alerts", "4. Numbers"],
        correct: "3. Alerts"
    },
    {
        question: "String values must be enclosed within ______ when being assigned to variables."
        answers: ["1. Commas", "2. Curly Brackets", "3. Quotes", "4. Parenthesis"],
        correct: "3. Quotes"
    },
    {
        question: "Arrays in JavaScript can be used to store _______."
        answers: ["1. Numbers and Strings", "2. Other Arrays", "3. Booleans", "4. All of the Above"],
        correct: "4. All of the Above"
    },
    {
        question: "The condition in an if/else statement is enclosed with ________."
        answers: ["1. Quotes", "2. Curly Brackets", "3. Parentesis", "4. Square Brackets"],
        correct: "2. Curly Brackets"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:"
        answers: ["1. JavaScript", "2. Terminal/Bash", "3. For Loops", "4. Console.log"],
        correct: "4. Console.log"
    }
]

function renderQuestion() {
    //This function is what will display our question
    var questionObject = questions[index]
    // var h1El = document.createElement("h1");
    // h1El.textContent = questionObject.question;
    // questionContainerEl.appendChild(h1El);

    questionDisplay.textContent = questionObject.question;
    
    button1.textContent = questionObject.answers[0];
    button1.textContent = questionObject.answers[1];
    button1.textContent = questionObject.answers[2];
    button1.textContent = questionObject.answers[3];
// This is where we are able to add the text above into the questions. I kept forgetting to start with 0, so this took longer for me than it should have.
    
}

function answerCorrect(correct) {
    if (questions[index].correct === questions[index].answers[correct]) {
        initialScore = initialScore + 10;
        correctAnswer.textContent = "Correct!"
    }
    //This will show if you chose the correct answer
    else {
        timeLeft = timeLeft - 10;
        timeLeft.textContent = timeLeft;
        correctAnswer.textContent = "Incorrect!"
    }
    //This will show if the user picks the incorrect answer, and will subtract 10 seconds from the total current time

    index = index + 1
    // This line will make user go to the next question

    if (index < questions.length) {
        renderQuestion();
    }
    else {
        endQuiz();
    }
    //This if/else statement is what will be used to see if there are any more questions, if there is not it will end the quiz
}

function option1() {
    answerCorrect(0);
}
function option2() {
    answerCorrect(1);
}
function option3() {
    answerCorrect(2);
}
function option4() {
    answerCorrect(3);
}
// This will allow the correct answer to be shown/picked on each question

function timer(){
    var timeInterval = setInterval(function () {
        if (timeLeft > 1) {
            timerEl.textContent = 'Time: ' + timeLeft;
            timeLeft--;
            // If there is more than 1 second left this is what will show and shows the time left

        } else {
            timerEl.textContent = '';
            clearInterval(timeInterval);
        }
        // This will show when there is leff than a second left
    }, 1000)
    // This timer function is for 1000 intervals
}
