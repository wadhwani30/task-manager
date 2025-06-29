const Task = require("../models/Task");

// Get all tasks with filtering and pagination (BONUS FEATURES)
const getAllTasks = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    // Build filter object
    const filter = {};
    if (status) {
      filter.status = status;
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get total count for pagination info
    const totalTasks = await Task.countDocuments(filter);

    // Get status counts (NEW FEATURE)
    const taskCompleted = await Task.countDocuments({ status: "done" });
    const taskPending = await Task.countDocuments({ status: "pending" });
    const taskInProgress = await Task.countDocuments({ status: "in-progress" });

    // Get tasks with filter, pagination, and sorting
    const tasks = await Task.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: tasks.length,
      totalTasks,
      taskCompleted,
      taskPending,
      taskInProgress,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalTasks / parseInt(limit)),
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Get single task by ID
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Create a new task with enhanced validation (BONUS FEATURE)
const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    // Enhanced validation
    if (!title || title.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Title is required and cannot be empty",
      });
    }

    if (title.length > 100) {
      return res.status(400).json({
        success: false,
        message: "Title cannot exceed 100 characters",
      });
    }

    if (description && description.length > 500) {
      return res.status(400).json({
        success: false,
        message: "Description cannot exceed 500 characters",
      });
    }

    if (status && !["pending", "in-progress", "done"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be one of: pending, in-progress, done",
      });
    }

    const newTask = new Task({
      title: title.trim(),
      description: description ? description.trim() : undefined,
      status: status || "pending",
    });

    const savedTask = await newTask.save();

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: savedTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Update task
const updateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, status },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
