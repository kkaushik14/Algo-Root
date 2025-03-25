document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskContainer');

    const API_BASE_URL = "https://task-manager-4n7k.onrender.com/api/tasks";

    async function fetchTasks() {
        try {
            const response = await fetch(API_BASE_URL);
            if (!response.ok) throw new Error("Failed to fetch tasks");
            return await response.json();
        } catch (error) {
            console.error("Error fetching tasks:", error);
            return [];
        }
    }

    async function renderTasks() {
        const tasks = await fetchTasks();
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.className = `p-4 border ${task.completed ? 'bg-green-50' : 'bg-white'} rounded-lg shadow-sm`;

            taskElement.innerHTML = `
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <input type="checkbox" ${task.completed ? 'checked' : ''} 
                            class="w-5 h-5 text-sky-600" 
                            onchange="toggleTaskCompletion('${task.id}')">
                        <div>
                            <h3 class="font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}">${task.text}</h3>
                            ${task.description ? `<p class="text-sm text-gray-500">${task.description}</p>` : ''}
                        </div>
                    </div>
                    <div class="flex space-x-2">
                        <button onclick="editTaskPrompt('${task.id}')" 
                            class="text-sky-600 hover:text-sky-800">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button onclick="deleteTask('${task.id}')" 
                            class="text-red-600 hover:text-red-800">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            `;
            taskList.appendChild(taskElement);
        });
    }

    async function addTask(event) {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        const taskDesc = document.getElementById('taskDescription').value.trim();

        if (!taskText) return;

        await fetch(API_BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: taskText, description: taskDesc })
        });

        taskInput.value = "";
        document.getElementById('taskDescription').value = "";
        await renderTasks();
    }

    taskForm.addEventListener('submit', addTask);
    renderTasks();
});