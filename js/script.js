// Get elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const notification = document.getElementById('notification');

// Load tasks from localStorage
const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task));
};

// Save tasks to localStorage
const saveTasks = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Add task to DOM
const addTaskToDOM = (task) => {
    const li = document.createElement('li');
    li.textContent = task.text;
    li.classList.toggle('completed', task.completed);
    li.dataset.id = task.id;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit');
    editBtn.onclick = () => editTask(task.id);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete');
    deleteBtn.onclick = () => deleteTask(task.id);

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
};

// Add task
const addTask = () => {
    const taskText = taskInput.value.trim();
    if (!taskText) {
        showNotification('Please enter a task.');
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
    };

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(newTask);
    saveTasks(tasks);
    addTaskToDOM(newTask);
    taskInput.value = '';
    showNotification('Task added successfully!');
};

// Edit task
const editTask = (id) => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const task = tasks.find(task => task.id === id);
    taskInput.value = task.text;
    deleteTask(id); // Remove the task before adding it back
};

// Delete task
const deleteTask = (id) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')).filter(task => task.id !== id);
    saveTasks(tasks);
    renderTasks();
    showNotification('Task deleted successfully!');
};

// Render tasks
const renderTasks = () => {
    taskList.innerHTML = '';
    loadTasks();
};

// Show notification
const showNotification = (message) => {
    notification.textContent = message;
    setTimeout(() => {
        notification.textContent = '';
    }, 3000);
};

// Event listeners
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Load tasks on page load
loadTasks();
