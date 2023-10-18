const questions = [
    {
        question: "Ce țară din America de Sud are cea mai mare suprafață?",
        answers: [
            {text: "Brazilia", correct: true},
            {text: "Argentina", correct: false},
            {text: "Chile", correct: false},
            {text: "Peru", correct: false},

        ]
       
    },
    {
        question: "Care este numele complet al păpușii Barbie?",
        answers: [
            {text: "Barbara Alyn Woods ", correct: false},
            {text: "Barbu Valeria", correct: false},
            {text: "Barbara Millicent Roberts", correct: true},
            {text: "doar Barbie", correct: false},

        ]
       
    },
    {
        question: "Care era ocupația din cartea de vizită a lui Al Capone",
        answers: [
            {text: "Vânzător de mobilă folosită ", correct: true},
            {text: "Șofer de tir", correct: false},
            {text: "Recuperator de creanțe", correct: false},
            {text: "Dresor de câini in cadrul poliției", correct: false},

        ]


    },
    {
        question: "Câti ani a durat Războiul de 100 de ani?",
        answers: [
            {text: "100", correct: false},
            {text: "109", correct: false},
            {text: "105", correct: false},
            {text: "116", correct: true},

        ]


    },
    {
        question: "Ce culoare are cutia neagră a unui avion?",
        answers: [
            {text: "Roșie", correct: false},
            {text: "Mov", correct: false},
            {text: "Neagră", correct: false},
            {text: "Portocalie", correct: true},

        ]


    },
    
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;   

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

}
function resetState(){
    nextButton.style.display = "none";
    while (answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;    
    } else {
        selectedBtn.classList.add("incorrect"); 
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `Ai răspuns corect la ${score} din ${questions.length} întrebări.`;
    nextButton.innerHTML = `Play again`;
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }    
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }

})
startQuiz();