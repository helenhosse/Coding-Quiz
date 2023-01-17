var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var optionsEl = document.querySelector("#options");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start-screen");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");
var submitButton = document.querySelector('#name-submit');

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

var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

function startQuiz() {
    var startScreenEl = document.getElementById("start-screen");
    startScreenEl.setAttribute("class", "hide");

    questionsEl.removeAttribute("class");

    timerId = setInterval(clockTick,1000);

    timerEl.textContent = time;

    getQuestion();
}



function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex];

    var titleEl = document.getElementById("question");
    titleEl.textContent = currentQuestion.question;

    optionsEl.innerHTML = "";

    currentQuestion.options.forEach(function (options, i) {

        var optionsNode = document.createElement("button");
        optionsNode.setAttribute("class", "options");
        optionsNode.setAttribute("value", options);

        optionsNode.textContent = i + 1 + ". " + options;

        optionsNode.onclick = questionClick;

        optionsEl.appendChild(optionsNode);
    });
}


function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
        time -= 15;

        if (time < 0) {
            time = 0
        }
        timerEl.textContent = time;
        feedbackEl.textContent = "Incorrect!";
        feedbackEl.style.color ="red";
        feedbackEl.style.fontSize = "150%";
    } else {
        feedbackEl.textContent = "Correct!";
        feedbackEl.style.color = "green";
        feedbackEl.style.fontSize = "150%";
    }

    feedbackEl.setAttribute ("class", "feedback");
    setTimeout(function () {
        feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);

    currentQuestionIndex++;

    if (currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        getQuestion ();
    }
}

function quizEnd() {
    clearInterval (timerId);

    var endScreenEl = document.getElementById("end-screen");
    endScreenEl.removeAttribute("class");

    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;

    questionsEl.setAttribute ("class", "hide");
}

function clockTick() {
     time--;
    timerEl.textContent = time;

    if (time <= 0) {
        quizEnd();
    }
}


// this entire part needs to be redone again, because I have no idea what I'm doing wrong 
function saveHighScores() {

    var initials = initialsEl.value.trim();

    if (initials !== "") {

        var highscores = 
        JSON.parse(window.localStorage.getItem("highscores")) || [] ;

        var newScore = {
            score: time,
            initials: initials, 
        };

        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));

        // this will take you to the second html page to show the score
        window.location.href = "./2ndpage.html";

    }
}

function checkForEnter(event) {

    if (event.key === "Enter") {
        saveHighScores();
    }
}

submitBtn.onclick = saveHighScores;
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;


// I cannot figure out what I am doing wrong here but it will not store the score, will come back to fix but wanted to submit

//supposed to be getting the high scores from the local storage, getting my tutor to assist
    
function showHighscores() {

    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    highscores.forEach(function(score) {

        var liTag = document.createElement("li");
        liTag.textContent = score.initials + " - " + score.score;
        
        var olEl = document.getElementById("highscores");
        olEl.appendChild(liTag);
        
    });
}


showHighscores();