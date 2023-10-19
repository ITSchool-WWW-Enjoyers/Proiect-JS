let timer;
const element = document.getElementById("timer");
let seconds = 0;
let isPaused = false;

const startTimer = () => {
    if (!timer) {
        timer = setInterval(() => {
            if (isPaused) {
                return;
            }
            seconds++;
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            element.innerHTML = pad(minutes) + ":" + pad(remainingSeconds); 
        }, 1000); 
    }
};
const pauseTimer = () => {
    isPaused = true ;
}

const pad = val => {
    const valString = val + "";
    return valString.length < 2 ? "0" + valString : valString;
};

document.getElementById("startTimer").addEventListener("click", startTimer)
document.getElementById("calculateButton").addEventListener("click", pauseTimer);
