document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskContainer'); // Fixed ID name

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskElement = document.createElement('div');
            taskElement.className = `p-4 border ${task.completed ? 'bg-green-50' : 'bg-white'} rounded-lg shadow-sm`;

            taskElement.innerHTML = `
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <input type="checkbox" ${task.completed ? 'checked' : ''} 
                            class="w-5 h-5 text-sky-600" 
                            onclick="toggleTaskCompletion(${index})">
                        <div>
                            <h3 class="font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}">${task.text}</h3>
                            ${task.description ? `<p class="text-sm text-gray-500">${task.description}</p>` : ''}
                        </div>
                    </div>
                    <div class="flex space-x-2">
                        <button onclick="editTask(${index})" 
                            class="text-sky-600 hover:text-sky-800">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button onclick="deleteTask(${index})" 
                            class="text-red-600 hover:text-red-800">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            `;

            taskList.appendChild(taskElement);
        });
    }

    function addTask(event) {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        const taskDesc = document.getElementById('taskDescription').value.trim();

        if (taskText === "") return;

        tasks.push({
            text: taskText,
            description: taskDesc,
            completed: false
        });

        taskInput.value = "";
        document.getElementById('taskDescription').value = "";

        saveTasks();
        renderTasks();
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    function editTask(index) {
        const newTitle = prompt("Edit Task Title:", tasks[index].text);
        if (newTitle !== null) {
            tasks[index].text = newTitle.trim();
            saveTasks();
            renderTasks();
        }
    }

    function toggleTaskCompletion(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }

    taskForm.addEventListener('submit', addTask);

    window.deleteTask = deleteTask;
    window.editTask = editTask;
    window.toggleTaskCompletion = toggleTaskCompletion;

    renderTasks();
});