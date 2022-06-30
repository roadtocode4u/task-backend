const express = require("express");
require('dotenv').config()
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

// temp database
let tasks = [];

// Create a Task
app.post("/tasks", (req, res) => {
  const task = {
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
    emoji: req.body.emoji,
  };

  tasks.push(task);

  res.json({
    status: "success",
    message: "Task added successfully",
    data: task,
  });
});

// To read all tasks
app.get("/tasks", (req, res) => {
  res.json({
    status: "success",
    data: tasks,
  });
});

// Read specific task
app.post("/get_task", (req, res) => {
  const id = req.body.id;

  let resultTask;

  tasks.map((task) => {
    if (task.id === id) {
      resultTask = task;
    }
  });

  res.json({
    status: "success",
    data: resultTask,
  });
});

// Delete All Tasks
app.post("/delete_tasks", (req, res) => {
  tasks = [];
  res.json({
    status: "success",
    message: "Successfully deleted all tasks",
    data: tasks,
  });
});

// Delete Specific Task by Id
app.post("/delete_task", (req, res) => {
  const id = req.body.id;

  let index = -1;

  tasks.map((task, i) => {
    if (id === task.id) {
      index = i;
    }
  });

  tasks.splice(index, 1);

  res.json({
    status: "success",
    message: `Successfully deleted task with id: ${id}`,
    data: tasks,
  });
});

app.post("/update_task", (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const description = req.body.description;
  const priority = req.body.priority;
  const emoji = req.body.emoji;

  let index = -1;

  tasks.map((task, i) => {
    if (id === task.id) {
      index = i;
    }
  });

  tasks[index] = {
    id: id,
    title: title,
    description: description,
    priority: priority,
    emoji: emoji,
  };

  res.json({
    status: "success",
    message: "Task updated successfully",
    data: tasks,
  });
});

app.listen(PORT, () => {
  console.log("Wow! Server started running on port", PORT);
});
