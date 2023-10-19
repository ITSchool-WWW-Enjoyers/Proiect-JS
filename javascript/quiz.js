function calculateScore() {
    let correctCount = 0;
    let wrongCount = 0;

    const questions = document.forms["quizForm"].elements;

    for (let i = 0; i < questions.length; i++) {
        const currentQuestion = questions[i];
        if (currentQuestion.type === "radio" && currentQuestion.checked) {
            const selectedAnswer = currentQuestion.value;
            if (selectedAnswer === "a") {
                correctCount++;
            } else {
                wrongCount++;
            }
        }
    }

    const resultMessage = `Ai obținut ${correctCount} puncte din 10.<br><br>` +
    `Răspunsuri corecte: ${correctCount}<br>` +
    `Răspunsuri greșite: ${wrongCount}`;
    
    document.getElementById("result").innerHTML = resultMessage;
}

function resetForm() {
    document.getElementById("quizForm").reset();
    document.getElementById("result").innerHTML = "";
}

function startQuiz() {
    let quizForm = document.getElementById("quizForm");
    quizForm.classList.remove("d-none");
}

document.getElementById("calculateButton").addEventListener("click", calculateScore);
document.getElementById("resetButton").addEventListener("click", resetForm);
document.getElementById("startTimer").addEventListener("click", startQuiz);
