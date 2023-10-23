const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("lcontainer");

function addTask() {
    if (inputBox.value === '') {
        alert("Please add a task!");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "&times;";
        li.appendChild(span);
    }

    inputBox.value = "";


    saveData();
}

document.getElementById('add-button').addEventListener('click', addTask);


listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

inputBox.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addTask();
    }
});


function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");

}
showTask();

