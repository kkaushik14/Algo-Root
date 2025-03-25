require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 2011;
const TASKS_FILE = path.join(__dirname, 'tasks.json');

const allowedOrigins = [
  "https://task-manager-tan-zeta.vercel.app",
  "https://task-manager-2wshw1v0g-kumar-kaushiks-projects.vercel.app",
  "http://localhost:2011"
];

if (!fs.existsSync(TASKS_FILE)) {
  fs.writeFileSync(TASKS_FILE, '[]');
}

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: "Content-Type",
  credentials: true
}));

app.use(express.json());

app.get('/api/tasks', (req, res) => {
  try {
    res.json(readTasks());
  } catch (error) {
    res.status(500).json({ error: 'Failed to read tasks' });
  }
});

app.post('/api/tasks', (req, res) => {
  try {
    const tasks = readTasks();
    const newTask = {
      id: uuidv4(),
      text: req.body.text,
      description: req.body.description || '',
      completed: false,
    };
    tasks.push(newTask);
    writeTasks(tasks);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add task' });
  }
});

app.put('/api/tasks/:id', (req, res) => {
  try {
    const tasks = readTasks();
    const index = tasks.findIndex(t => t.id === req.params.id);
    if (index === -1) return res.status(404).send('Task not found');

    tasks[index] = { ...tasks[index], ...req.body };
    writeTasks(tasks);
    res.json(tasks[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

app.delete('/api/tasks/:id', (req, res) => {
  try {
    let tasks = readTasks();
    const initialLength = tasks.length;
    tasks = tasks.filter(t => t.id !== req.params.id);
    if (tasks.length === initialLength) return res.status(404).send('Task not found');

    writeTasks(tasks);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

const readTasks = () => {
  try {
    return JSON.parse(fs.readFileSync(TASKS_FILE));
  } catch (error) {
    return [];
  }
};

const writeTasks = (tasks) => {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
};

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});