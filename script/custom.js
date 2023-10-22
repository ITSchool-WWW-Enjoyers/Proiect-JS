const taskInput = document.getElementById('taskInput');
const createTask = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

createTask.addEventListener('submit', (event) => {
    event.preventDefault(); 
    const taskContent = taskInput.value;
    if (taskContent) {
        const newTask = document.createElement('li');
        newTask.innerHTML =  `
            <input type='checkbox'>
            <span>${taskContent}</span>
            <button class='edit'>Edit</button>
            <button class='delete'>Delete</button>
        `;
        taskList.appendChild(newTask);
        taskInput.value = '';
    }
});

taskList.addEventListener('change', (event) => {
    if (event.target.type === 'checkbox') {
        const task = event.target.nextElementSibling;
        if (event.target.checked) {
            task.style.textDecoration = 'line-through';
            task.style.color = 'red';
        } else {
            task.style.textDecoration = 'none';
            task.style.color = 'initial';
        }
    }
  
});

taskList.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete')) {
        event.target.parentElement.remove();
    }
});
