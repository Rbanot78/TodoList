
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());


let tasks = [
    {
        id: 1,
        assignedTo: "Alice Johnson",
        status: "not started",
        dueDate: new Date(2024, 9, 5).toISOString(), 
        priority: "high",
        comment: "This task is critical for the project.",
    },
];


const validStatuses = ["not started", "in progress", "completed"];
const validPriorities = ["low", "normal", "high"];


app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});


app.post('/api/tasks', (req, res) => {
    const { assignedTo, status, dueDate, priority, comment } = req.body;

   
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status. Must be one of: ' + validStatuses.join(', ') });
    }

    if (!validPriorities.includes(priority)) {
        return res.status(400).json({ message: 'Invalid priority. Must be one of: ' + validPriorities.join(', ') });
    }

    const newTask = { id: tasks.length + 1, assignedTo, status, dueDate, priority, comment };
    tasks.push(newTask);
    res.status(201).json(newTask);
});


app.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { assignedTo, status, dueDate, priority, comment } = req.body;

    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status. Must be one of: ' + validStatuses.join(', ') });
    }

    if (!validPriorities.includes(priority)) {
        return res.status(400).json({ message: 'Invalid priority. Must be one of: ' + validPriorities.join(', ') });
    }

    const index = tasks.findIndex(task => task.id == id);
    if (index !== -1) {
        tasks[index] = { id: parseInt(id), assignedTo, status, dueDate, priority, comment };
        res.json(tasks[index]);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});


app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter(task => task.id != id);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
