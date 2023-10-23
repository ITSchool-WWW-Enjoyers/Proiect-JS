
document.getElementById('light-mode-switch').addEventListener('click', lightMode);

//Documentatia: https://www.w3schools.com/howto/howto_js_toggle_dark_mode.asp
function lightMode() {
    const element = document.body;
    element.classList.toggle("light-mode");
}