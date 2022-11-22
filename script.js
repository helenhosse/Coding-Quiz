var timerEl = document.getElementById("timer");

var startEl = document.getElementById("start");
var quizEl = document.getElementById("quiz-container");
var questionContainerEl = document.getElementById("question-container");
var answerButtonsEl = document.getElementById("answer-buttons");
var questionDisplay = document.getElementById("question-display");

var index = 0;
var initialScore = 0;
var secondsLeft = 75;
var rightAnswer = "";
var userAnswer = "";
var questionNumber = "";
var answerNumber = "";
var secondsLeft = "";
var interval;
var highScores = 0;

var timeEl = document.querySelector("timer")


var totalScore = document.getElementById("totalScore");
var highScoresEl = document.getElementById("highScores");
var scoresEl = document.getElementById("scores");
var submitScores = document.getElementById("submitScores");
var highScoresListEl = document.getElementById("highScoresList");

var questions = [
    {
        question: "Commonly used data types DO NOT include which of the following:",
        rightAnswer: "3. Alerts",
        options: ["1. Strings", "2. Booleans", "3. Alerts", "4. Numbers"],
    },
    {
        question: "String values must be enclosed within ______ when being assigned to variables.",
        rightAnswer: "3. Quotes",
        options: ["1. Commas", "2. Curly Brackets", "3. Quotes", "4. Parenthesis"],
    },
    {
        question: "Arrays in JavaScript can be used to store _______.",
        rightAnswer: "4. All of the Above",
        options: ["1. Numbers and Strings", "2. Other Arrays", "3. Booleans", "4. All of the Above"],
    },
    {
        question: "The condition in an if/else statement is enclosed with ________.",
        rightAnswer: "2. Curly Brackets",
        options: ["1. Quotes", "2. Curly Brackets", "3. Parentesis", "4. Square Brackets"],
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        rightAnswer: "4. Console.log",
        options: ["1. JavaScript", "2. Terminal/Bash", "3. For Loops", "4. Console.log"],
    }
]

var timeEl = document.querySelector("timer")

function startGame() {
    startTime ();
    document.getElementById ("start").addEventListener("click", startGame)
}



function initializeQuiz() {
    var initialize = document.getElementById("start");
}
// This is where we are able to add the text above into the questions. I kept forgetting to start with 0, so this took longer for me than it should have.
    

var answerButton1 = document.getElementById('btn-1');
answerButton1.addEventListener("click", nextQuestion);

var answerButton2 = document.getElementById('btn-2');
answerButton2.addEventListener("click", nextQuestion);

var answerButton3 = document.getElementById('btn-3');
answerButton3.addEventListener("click", nextQuestion);

var answerButton4 = document.getElementById('btn-4');
answerButton4.addEventListener("click", nextQuestion);

var correctAnswer = document.getElementById('correctAnswer');

function nextQuestion() {
    questionNumber++;
    questionDisplay (question, questionNumber);
}



function answerCorrect(correct) {
    if (questions[index].correct === questions[index].answers[correct]) {
        initialScore = initialScore + 10;
        correctAnswer.textContent = "Correct!"
    }
    //This will show if you chose the correct answer
    else {
        secondsLeft = secondsLeft - 10;
        secondsLeft.textContent = secondsLeft;
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

var ansButtonsEl
// This will allow the correct answer to be shown/picked on each question

function timer(){
    var interval = setInterval(function () {
        if (secondsLeft === 0) {
            clearInterval(interval);
            alert("Game-Over"); 
            // If there isno time left, this will show that the game has ended

        } else {
            secondsLeft --;
            timeEl.textContent = secondsLeft;
        }
        // This will show how many seconds are left if there are any

    }, 1000)
    // This timer function is for 1000 intervals
}

function endQuiz() {
    quizEl.classList.add('hide');
    answerButtonsEl.classList.add('hide')
    scoresEl.classList.remove('hide');
    // This is what will end the quiz

    var finalScore = document.createElement("h1");
    finalScore.textContent = "Your final score is: " + initialScore;
    var saveInfo = document.createElement("h1");
    saveInfo.textContent = "Enter your initials: "
    scoresEl.appendChild(saveInfo);
    scoresEl.appendChild(finalScore);
    //This is where you will get the final score at the end
}

function storeScores() {
    var savedHighScores = localStorage.getItem("High Scores");

    savedHighScores = JSON.parse(savedHighScores)

    var userScore = {
        Name: enterName.value,
        Score: initialScore
    };

    savedHighScores.push(userScore);

    var scoresCombined = JSON.stringify (savedHighScores);
    window.localStorage.setItem("High Scores", scoresCombined);

    highScores();
};
// This is where we will capture the high scores 

function highScores() {
    highScoresListEl.classList.remove('hide');
    quizEl.classList.add('hide');
    //This one section will make sure that the high scores are hidden with this command on HTML

    var storedScores = localStorage.getItem("High Scores");
    var storedScores = JSON.parse(storedScores);

    for (i=0; i<storedScores.length; i++) {
        var initialHighScore = document.createElement("h2");
        initialHighScore.textContent = "Name: " + storedScores[i].Name + "with" + storedScores[i].Score + "points";
        highScoresListEl.appendChild(initialHighScore);
    }

}
button1.addEventListener("click", option1);
button2.addEventListener("click", option2);
button3.addEventListener("click", option3);
button4.addEventListener("click", option4);

submitScoresEl.addEventListener("click", storeScores);
highScoresEl.addEventListener("click", highScores);
