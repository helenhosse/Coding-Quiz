const startButton = document.getElementById('start-btn')

const nextButton = document.getElementById('next-btn')

const questionContainerElement = document.getElementById('question-card')

const questionElement = document.getElementById('question')

const answerButtonsElement = document.getElementById('answer-buttons')

const timerElement = document.getElementById('timer')

const nameEntryElement = document.getElementById('entry-card')

const scoreCardElement = document.getElementById('score')

const startCardElement = document.getElementById('start-card')

const userNameSpan = document.getElementById('username')

const userScoreSpan = document.getElementById('highscore')

var submitButton = document.querySelector('#name-submit');

startButton.addEventListener('click', timedLogic)

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

function timedLogic() {

    let globalScore = 75

    if (globalScore === 0) {
        clearInterval(globalTimer)
        showScoreCard()
    }

    let shuffledQuestions, currentQuestionIndex

    startGame()

    nextButton.addEventListener('click', () => {
        currentQuestionIndex++
        setNextQuestion()
    })

    function startGame() {
        startButton.classList.add('hide')
        shuffledQuestions = questions.sort(() => Math.random() - .5)
        currentQuestionIndex = 0
        questionContainerElement.classList.remove('hide')
        setNextQuestion()
    }

    var globalTimer = setInterval(function () {
        if (globalScore > 0) {
            globalScore--
            timerElement.innerText = globalScore
        } else {
            clearInterval(globalTimer)
            // show score card and hide all other containers if time runs out
            showScoreCard()
        }
    }, 1000)

    function setNextQuestion() {
        clearQuestionContainer()
        showQuestion(shuffledQuestions[currentQuestionIndex])
    }

    function showQuestion(question) {
        questionElement.innerText = question.question
        question.answers.forEach(answer => {
            const button = document.createElement('button')
            button.setAttribute('id', 'btn')
            button.innerText = answer.text
            button.classList.add('btn', 'btn-primary', 'btn-lg', 'btn-block')
            if (answer.correct) {
                button.dataset.correct = answer.correct
            }
            button.addEventListener('click', selectAnswer)
            button.addEventListener('click', answerCheck)
            answerButtonsElement.appendChild(button)
        })
    }

    function clearQuestionContainer() {
        clearStatusClass(document.body)
        nextButton.classList.add('hide')
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild)
        }
    }

    function answerCheck(e) {
        console.log("answer check running")
        const selectedButton = e.target
        const correct = selectedButton.dataset.correct
        // remove points if answer choice is false
        if (correct) {
        } else {
            removePoints()
        }
    }

    function selectAnswer(e) {
        const selectedButton = e.target
        const correct = selectedButton.dataset.correct
        Array.from(answerButtonsElement.children).forEach(button => {
            setStatusClass(selectedButton, selectedButton.dataset.correct)
        })
        // Shows score card when out of questions
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            nextButton.classList.remove('hide')
        } else {
            // show score card when out of questions
            // wait 1 second for timer to catch up with score decriment if the last question is answered wrong
            setTimeout(function () {
                clearInterval(globalTimer)
                showScoreCard()
            }, 1000);
        }
    }

    function setStatusClass(element, correct) {
        clearStatusClass(element)
        if (correct) {
            //correct color
            element.classList.add('btn', 'btn-success', 'btn-lg', 'btn-block')
        } else {
            //wrong color
            element.classList.add('btn', 'btn-danger', 'btn-lg', 'btn-block')
        }
        // disable all buttons when one is clicked
        document.querySelectorAll('#btn').forEach(button => {
            button.disabled = true
        })
    }

    function clearStatusClass(element) {
        //correct color
        element.classList.remove('btn', 'btn-success', 'btn-lg', 'btn-block')
        //wrong color
        element.classList.remove('btn', 'btn-danger', 'btn-lg', 'btn-block')
    }

    function showScoreCard() {
        startCardElement.classList.add('hide')
        questionContainerElement.classList.add('hide')
        nameEntryElement.classList.remove('hide')
        document.getElementById('finalscore').innerText = globalScore
        document.getElementById('name-submit').addEventListener('click', localStorageCard)
    }

    submitButton.addEventListener('click', function (event) {
        event.preventDefault()
        var name = document.querySelector('#input-name').value
        var score = globalScore
        console.log(document.querySelector('#finalscore').value)
        if (name === '') {
            displayMessage('error', 'Name cannot be blank')
        }
        localStorage.setItem('username', name)
        localStorage.setItem('finalscore', score)
        localStorageCard()
    })


    function localStorageCard() {
        timerElement.innerText = globalScore
        nameEntryElement.classList.add('hide')
        scoreCardElement.classList.remove('hide')
        var name = localStorage.getItem('username')
        var score = localStorage.getItem('finalscore')
        if (name === null || score === null) {
            return
        }
        userNameSpan.textContent = name
        userScoreSpan.textContent = score
    }

    function removePoints() {
        globalScore = globalScore - 10
    }

}

