import '../light-mode.js';

const timeSpan = document.getElementById('hours');

const dateLabel = document.getElementById('date-label');
const timezoneSelector = document.getElementById("timezone");

//Documentatia: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/supportedValuesOf
const timeZones = Intl.supportedValuesOf('timeZone');
timeZones.forEach((timezone) => {
    let option = document.createElement('option'); 
    option.value = timezone;
    option.text = timezone;
    timezoneSelector.appendChild(option);
});


timezoneSelector.addEventListener('change', displayTime);

function displayTime(){

    const currentLocale = navigator.language;
    const selectedTimezone = timezoneSelector.value;
    const date = new Date().toLocaleDateString(currentLocale,  {timeZone: selectedTimezone});
    const time = new Date().toLocaleTimeString(currentLocale,  {timeZone: selectedTimezone});
    
    dateLabel.innerText = date;
    timeSpan.innerText = time;
    
}

displayTime();
setInterval(displayTime, 1000);