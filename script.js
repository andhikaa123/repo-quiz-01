const questions = [
    {
        question : "Which is largest animal in the world",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
        ],
        input : false
    }, 
    {
        question : "Which is smallest country in the world",
        answers: [
            {text: "Vatican City", correct: true},
            {text: "Bhutan", correct: false},
            {text: "Nepal", correct: false},
            {text: "Shri Lanksa", correct: false},
        ],
        input : false
    },
    {
        question : "Which is the largest desert in the world",
        answers: [
            {text: "Kalahari", correct: false},
            {text: "Gobi", correct: false},
            {text: "Sahara", correct: false},
            {text: "Antarctica", correct: true},
        ],
        input : false
    },
    {
        question : "Which is the smallest continent in the world",
        answers: [
            {text: "Asia", correct: false},
            {text: "Australia", correct: true},
            {text: "Artic", correct: false},
            {text: "Africa", correct: false},
        ],
        input : false
    },
    {
        question: "What is the capital of France?",
        answers: [],
        input: true,
        correctAnswer: "Paris"
    }
]

const questionElement = document.getElementById("question")
const answerButtons = document.getElementById("answer-button")
const nextButton = document.getElementById("next-btn")

let currentQuestionIndex = 0
let score = 0

function startQuiz () {
    currentQuestionIndex = 0
    score = 0
    nextButton.innerHTML = "Next"
    showQuestion()
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    if (currentQuestion.input) {
        if (currentQuestion.input) {
            const inputField = document.createElement("input");
            inputField.setAttribute("type", "text");
            inputField.setAttribute("placeholder", "Type your answer...");
            inputField.classList.add("btn");
            answerButtons.appendChild(inputField);

            nextButton.style.display = "block";
            nextButton.addEventListener("click", handleNextButton);
            answerButtons.appendChild(nextButton);
            input = true;
            score++  
        }
    } else {
        currentQuestion.answers.forEach(answer => {
            const button = document.createElement("button");
            button.innerHTML = answer.text;
            button.classList.add("btn");
            answerButtons.appendChild(button);

            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener("click", selectAnswer);
        });
    }
}

function resetState() {
    nextButton.style.display = "none"
    while (answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        if (questions[currentQuestionIndex].input) {
            const inputField = answerButtons.querySelector("input");
            const userAnswer = inputField.value.trim().toLowerCase();
            const correctAnswer = questions[currentQuestionIndex].correctAnswer.toLowerCase();

            if (userAnswer === correctAnswer) {
                score++;
            }
        } else {
            score++;
        }
    } else {
        selectedBtn.classList.add("Incorrect");
    }

    if (questions[currentQuestionIndex].input) {
        const inputField = answerButtons.querySelector("input");
        inputField.disabled = true;
    } else {
        Array.from(answerButtons.children).forEach(button => {
            if (button.dataset.correct === "true") {
                button.classList.add("correct");
            }
            button.disabled = true;
        });
    }

    nextButton.style.display = "block";
}

function showScore() {
    resetState()
    let maxScore = 0
    maxScore = (score / questions.length) * 100;
    questionElement.innerHTML = `You Scored ${maxScore}%  ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton () {
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length){
        showQuestion()
    }
    else {
        showScore()
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length){
        handleNextButton()
    }
    else {
        startQuiz()
    }
})

startQuiz() 
