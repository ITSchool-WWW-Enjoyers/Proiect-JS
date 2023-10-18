
let hoursHand = document.getElementById('hours');
let minutesHand = document.getElementById('minutes');
let secondsHand = document.getElementById('seconds');

let dateLabel = document.getElementById('date-label');
let timezoneSelector = document.getElementById("timezone");

//Documentatia: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/supportedValuesOf
let timeZones = Intl.supportedValuesOf('timeZone');
timeZones.forEach((timezone) => {
    let option = document.createElement('option');
    option.value = timezone;
    option.text = timezone;
    timezoneSelector.appendChild(option);
});


timezoneSelector.addEventListener('change', displayTime);

function displayTime(){
    
    const selectedTimezone = timezoneSelector.value;
    const date = new Date().toLocaleString('en-EN',  {timeZone: selectedTimezone});

    dateLabel.innerText = date;

    let currentTime = new Date(date);

    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();

    //Aflam rotatia acelor in grade
    let hoursHandRotation = 30*hours + minutes/2;
    let minutesHandRotation = 6*minutes;
    let secondsHandRotation = 6*seconds;

    hoursHand.style.transform = `rotate(${hoursHandRotation}deg)`;
    minutesHand.style.transform = `rotate(${minutesHandRotation}deg)`;
    secondsHand.style.transform = `rotate(${secondsHandRotation}deg)`;

    console.log('S-a actualizat ora');

}

setInterval(displayTime, 1000);


document.getElementById('light-mode-switch').addEventListener('click', lightMode);

//Documentatia: https://www.w3schools.com/howto/howto_js_toggle_dark_mode.asp
function lightMode() {
    let element = document.body;
    element.classList.toggle("light-mode");
    console.log('S-a schimbat modul de luminozitate');
}

