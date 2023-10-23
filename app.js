//Digital
setInterval(function() {
    let date = new Date();
    clock.innerHTML = date.toLocaleTimeString("en-US",{
        hour12:false 
    });
});

//Analog
const secondsHand = document.getElementById('seconds');
const minutesHand = document.getElementById('minutes');
const hoursHand = document.getElementById('hours');

function getTime(){
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();
    const timeInterval = 6;
    secondsHand.style.transform = 'rotate('+ (seconds * timeInterval) + 'deg)';
    minutesHand.style.transform = 'rotate('+ (minutes * timeInterval + seconds / 10) + 'deg)';
    hoursHand.style.transform = 'rotate('+ (hours * 30 + minutes / 2) + 'deg)';
};
getTime();
setInterval(getTime,1000);

//Hide
const dBtn = document.querySelector(".digital-btn");
const aBtn = document.querySelector(".analog-btn");
const img = document.querySelector(".img");
const hands = document.querySelector(".analog-clock");
const digital = document.getElementById("clock");

dBtn.addEventListener('click', function(e){
    digital.classList.toggle("hide");
});

aBtn.addEventListener('click', function(e){
    hands.classList.toggle("hide")
    img.classList.toggle("hide")
});