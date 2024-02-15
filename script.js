const questions = [
    {
        question: "Hewan dibawah ini, berkembang biak dengan ? ",
        answers: [
            { text: "Melahirkan", correct: false },
            { text: "Bertelur", correct: true },
            { text: "Menyusui", correct: false },
            { text: "Makan nasi", correct: false },
        ],

        image: "img/soal 1.png",
    },
    {
        question: "Hewan dibawah ini, berkembang biak dengan ?",
        answers: [
            { text: "Bertelur", correct: false },
            { text: "Melahirkan", correct: true },
            { text: "Menyusui", correct: false },
            { text: "Bernafas", correct: false },
        ],

        image: "img/soal 2X.png",
    },
    {
        question: "Manakah hewan terbesar yang ada di bawah ini",
        answers: [
            { text: "Harimau", correct: false },
            { text: "Gajah", correct: false },
            { text: "Jerapah", correct: false },
            { text: "Paus biru", correct: true },
        ],

        image: "img/SOALL 33.png",
    },
    {
        question: "Manakah hewan terkecil yang ada di bawah ini",
        answers: [
            { text: "", correct: true, correctAnswer: "Semut"},
        ],
        image: "img/soal 44.png",
        input: true
    },
    {
        question: "Hewan ini dapat hidup di darat dan di air, hewan apakah ini ?",
        answers: [
            { text: "", correct: true, correctAnswer: "Katak" },
        ],

        image: "img/kodokk.png",
        input: true, 
    },
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");
const continueStudyButton = document.getElementById("continue-study-btn");
const appQuizElement = document.getElementById("app-quiz");


let currentQuestionIndex = 0;
let score = 0;


continueStudyButton.addEventListener("click", continueStudy);

function continueStudy() {
    document.getElementById('animal-quiz').style.display = 'none';
    appQuizElement.style.display = 'block';
    showQuestion();
}
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
    nextButton.removeEventListener("click", startQuiz); 
    nextButton.addEventListener("click", handleNextButton); 
}

function showQuestion() {
resetState();
let currentQuestion = questions[currentQuestionIndex];
let questionNo = currentQuestionIndex + 1;
questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

const imgElement = document.getElementById("questionImage");
imgElement.src = currentQuestion.image;

if (currentQuestion.input) {
    const inputField = document.createElement("input");
    inputField.setAttribute("type", "text");
    inputField.setAttribute("placeholder", "Type your answer...");
    inputField.classList.add("btn");
    answerButtons.appendChild(inputField);
    
    nextButton.style.display = "block";
    nextButton.addEventListener("click", handleNextButton);
} else {
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
            button.dataset.correctAnswer = answer.correctAnswer; // Store the correct answer
        }
        button.addEventListener("click", selectAnswer);
    });
    }
}

function resetState() {
    nextButton.style.display = "none";

    // Hide the image for input questions
    const imgElement = document.getElementById("questionImage");
    imgElement.src = "";

    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
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
        const correctAnswer = selectedBtn.dataset.correctAnswer.toLowerCase();

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
    nextButton.style.display = "block"; // Show the next button for input questions
} else {
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block"; // Show the next button for multiple-choice questions
}
}

function showScore() {
    resetState();
        let maxScore = (score / questions.length) * 100;
        questionElement.innerHTML = `You Scored ${maxScore}%  ${score} out of ${questions.length}`;
        nextButton.innerHTML = "Play Again";
        nextButton.style.display = "block";
    }

    function handleNextButton() {
        if (questions[currentQuestionIndex].input) {
            const inputField = answerButtons.querySelector("input");
            const userAnswer = inputField.value.trim().toLowerCase();
            const correctAnswer = questions[currentQuestionIndex].answers[0].correctAnswer.toLowerCase();
    
            if (userAnswer === correctAnswer) {
                score++;
            }
            inputField.disabled = true;
        }
    
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            showQuestion();
        } else {
            showScore();
            nextButton.removeEventListener("click", handleNextButton); 
            nextButton.addEventListener("click", startQuiz); 
            nextButton.innerHTML = "Play Again"; 
        }
    }

startQuiz();
