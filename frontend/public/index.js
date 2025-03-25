document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const container = document.getElementById('taskContainer');
    const descInput = document.getElementById('taskDescription');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const inputText = taskInput.value.trim();
        if(inputText === "") return;

        const newTask = {
            id: Date.now(),
            title: taskInput.value,
            description: descInput.value,
            completed: false,
        };

        tasks.push(newTask);
        saveTask();
        renderTask();

        taskInput.value = "";
        descInput.value = "";
    });

    function renderTask() {
        container.innerHTML = '';

        tasks.forEach(task => {
            const taskList = document.createElement('div');
            taskList.className = `p-4 border ${task.completed ? 'bg-green-50' : 'bg-white'} rounded-lg shadow-sm`;
            taskList.innerHTML = `
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <input type="checkbox" ${task.completed ? 'checked' : ''} 
                            class="w-5 h-5 text-sky-600" 
                            onclick="toggleComplete(${task.id})">
                        <div>
                            <h3 class="font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}">${task.title}</h3>
                            ${task.description ? `<p class="text-sm text-gray-500">${task.description}</p>` : ''}
                        </div>
                    </div>
                    <div class="flex space-x-2">
                        <button onclick="editTask(${task.id})" 
                            class="text-sky-600 hover:text-sky-800">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button onclick="deleteTask(${task.id})" 
                            class="text-red-600 hover:text-red-800">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            `;
            container.appendChild(taskList);
        });
    }

    function saveTask() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    renderTask();
});
