const Task = require("../models/Task");

// get all tasks for the logged-in user
const getTasks = async (req, res) => {
  try {

    const tasks = await Task.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(tasks);
  } catch (err) {
    console.error("Fetch tasks error:", err.message);
    res.status(500).json({ message: "Failed to load tasks" });
  }
};

// create a new task
const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Please provide a task title" });
    }

    const task = await Task.create({
      title: title.trim(),
      description: description ? description.trim() : "",
      priority: priority || "medium",
      dueDate: dueDate || null,
      userId: req.user.id,
    });

    res.status(201).json(task);
  } catch (err) {
    console.error("Create task error:", err.message);
    res.status(500).json({ message: "Could not create task" });
  }
};

// update an existing task 
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    // findByIdAndUpdate 
    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    console.error("Update error:", err.message);
    res.status(500).json({ message: "Update failed" });
  }
};

// delete a task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;


    const task = await Task.findOneAndDelete({ _id: id, userId: req.user.id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task removed successfully" });
  } catch (err) {
    console.error("Delete task error:", err.message);
    res.status(500).json({ message: "Could not delete task" });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };