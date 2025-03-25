require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 2011;
const TASKS_FILE = path.join(__dirname, 'tasks.json');

if (!fs.existsSync(TASKS_FILE)) {
  fs.writeFileSync(TASKS_FILE, '[]');
}

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/tasks', (req, res) => {
  res.json(readTasks());
});

app.post('/api/tasks', (req, res) => {
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
});

app.put('/api/tasks/:id', (req, res) => {
  const tasks = readTasks();
  const index = tasks.findIndex(t => t.id === req.params.id);
  if (index === -1) return res.status(404).send('Task not found');

  tasks[index] = { ...tasks[index], ...req.body };
  writeTasks(tasks);
  res.json(tasks[index]);
});

app.delete('/api/tasks/:id', (req, res) => {
  let tasks = readTasks();
  const initialLength = tasks.length;
  tasks = tasks.filter(t => t.id !== req.params.id);
  if (tasks.length === initialLength) return res.status(404).send('Task not found');

  writeTasks(tasks);
  res.status(204).send();
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const readTasks = () => JSON.parse(fs.readFileSync(TASKS_FILE));
const writeTasks = (tasks) => fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));