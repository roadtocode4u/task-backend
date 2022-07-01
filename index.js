const express = require("express");
const mongoose = require("mongoose")
require('dotenv').config()
const app = express();

const Task = require("./model/Task")

app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, ()=>{
  console.log("Connected to MongoDB Database...")
})


// Create a Task
app.post("/tasks", async(req, res) => {

  const task = new Task({
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
    emoji: req.body.emoji,
  })

  const savedTask = await task.save();

  res.json({
    'status': 'success',
    'data': savedTask
  })

});

// To read all tasks
app.get("/tasks", async(req, res) => {

  const allTasks = await Task.find();

  res.json({
    status: "success",
    data: allTasks,
  });
});

// Read specific task
app.post("/get_task", async(req, res) => {
  const id = req.body.id;

  const specificTask = await Task.findOne({id: id});

  res.json({
    status: "success",
    data: specificTask,
  });
});

// Delete All Tasks
app.post("/delete_tasks", async(req, res) => {

  const result = await Task.deleteMany();

  res.json({
    status: "success",
    message: "Successfully deleted all tasks",
    data: result
  });
});

// Delete Specific Task by Id
app.post("/delete_task", async(req, res) => {
  const id = req.body.id;

  const result = await Task.deleteOne({id: id});

  res.json({
    status: "success",
    message: `Successfully deleted task with id: ${id}`,
    data: result,
  });
});

app.post("/update_task", async(req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const description = req.body.description;
  const priority = req.body.priority;
  const emoji = req.body.emoji;

  const updateResult = await Task.updateOne({id: id}, {
    $set: {
      title: title,
      description: description,
      priority: priority,
      emoji: emoji,
    }
  })

  res.json({
    status: "success",
    message: "Task updated successfully",
    data: updateResult,
  });
});

app.listen(PORT, () => {
  console.log("Wow! Server started running on port", PORT);
});
