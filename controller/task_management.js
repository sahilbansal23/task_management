const mongoose = require("mongoose");
const logger = require("../utils/logger");
const User = require("../models/user");

//to remove all the deleted tasks/subtasks from the array
const excludeDeleted = (tasks) => {
  return tasks
    .filter((task) => !task.isDeleted)
    .map((task) => ({
      ...task._doc,
      subtasks: task.subtasks.filter((subtask) => !subtask.isDeleted),
    }));
};

//to get the list of the all the task for a user
const getAllTasks = async (req, res) => {
  try {
    const userID = req.body.userId;
    console.log(userID);
    const user = await User.findById(userID);
    let result;
    if (!user) {
      result = {};
      throw new Error("user not found");
    }
    // console.log(user);
    result = excludeDeleted(user.tasks);
    logger.info("SUer all non deleted Task returned Successfully");
    res.status(200).send({
      status: 200,
      message: "user With tasks/ subtasks returned successfully",
      data: result,
    });
  } catch (error) {
    logger.error(error);
    res.status(400).send({
      status: 400,
      message: error.message,
      data: {},
    });
  }
};

//to create a new task for a user
const createTask = async (req, res) => {
  try {
    const userId = req.body.userId;
    const newTask = req.body.task;
    if (newTask == null) {
      throw new Error("Can not create null task");
    }
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");
    user.tasks.push(newTask);
    await user.save();
    logger.info("Tasks Created Successfully");

    res.status(200).send({
      status: 200,
      message: "new Task is created",
      data: newTask,
    });
  } catch (error) {
    logger.error(error);
    res.status(400).send({
      status: 400,
      message: error.message,
      data: {},
    });
  }
};

//to update task for a user
const updateTask = async (req, res) => {
  try {
    const userId = req.body.userId;
    const taskId = req.params.taskId;
    console.log(taskId);
    const updatedTask = req.body.task;
    const user = await User.findById(userId);
    console.log(user);
    if (!user) {
      throw new Error("user not found");
    }
    // const taskIndex = user.tasks.findIndex(task => task._id == taskId);

    const task = user.tasks.id(taskId);
    console.log(task);

    if (!task || task.isDeleted) {
      throw new Error("task Not found");
    }
    logger.info("Task Updated Successfully");

    task.set(updatedTask);
    await user.save();
    res.status(200).send({
      status: 200,
      message: "Task is Updated",
      data: updatedTask,
    });
  } catch (error) {
    logger.error(error);
    res.status(400).send({
      status: 400,
      message: error.message,
      data: {},
    });
  }
};

//to soft delete the task for a user
const deleteTask = async (req, res) => {
  try {
    const userId = req.body.userId;
    const taskId = req.params.taskId;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User is not found");
    }
    const task = user.tasks.id(taskId);
    if (!task || task.isDeleted) {
      throw new Error("Task not found");
    }

    task.isDeleted = true;
    await user.save();
    logger.info("tasks Deleted(soft) Successfully");

    res.status(200).send({
      status: 200,
      message: "Task is Deleted",
      data: task,
    });
  } catch (error) {
    logger.error(error);
    res.status(400).send({
      status: 400,
      message: error.message,
      data: {},
    });
  }
};

//to get the subtasks for a task for a user
const getSubTasks = async (req, res) => {
  try {
    const userId = req.body.userId;
    const taskId = req.params.taskId;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User is not found");
    }
    const task = user.tasks.id(taskId);
    if (!task || task.isDeleted) {
      throw new Error("Task not found");
    }
    const subtasks = task.subtasks.filter((subtask) => !subtask.isDeleted);
    logger.info("Sub tasks Returned Successfully");
    res.status(200).send({
      status: 200,
      message: "User all subtaks returned successfully",
      data: subtasks,
    });
  } catch (error) {
    logger.error(error);
    res.status(400).send({
      status: 400,
      message: error.message,
      data: {},
    });
  }
};

//to update a subtask of a task for a user
const updateSubTask = async (req, res) => {
  try {
    const userId = req.body.userId;
    const taskId = req.params.taskId;
    const newSubtasks = req.body.subtasks;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("user not found");
    }
    const task = user.tasks.id(taskId);
    if (!task || task.isDeleted) {
      throw new Error("user not found");
    }
    task.subtasks = [
      ...task.subtasks.filter((subtask) => subtask.isDeleted),
      ...newSubtasks,
    ];
    await user.save();
    logger.info("Sub tasks updated Successfully");
    res.status(200).send({
      status: 200,
      message: "Subtasks are updated",
      data: newSubtasks,
    });
  } catch (error) {
    logger.error(error);
    res.status(400).send({
      status: 400,
      message: error.message,
      data: {},
    });
  }
};

//additional api to create the user
const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = new User({ name, email, tasks: [] });
    await newUser.save();
    logger.info("user created Successfully");
    res.status(200).send({
      status: 200,
      message: "user is created",
      data: newUser,
    });
  } catch (error) {
    logger.error(error);
    res.status(400).send({
      status: 400,
      message: error.message,
      data: {},
    });
  }
};

//additional api to ge the list of the user
const getUser = async (req, res) => {
  try {
    const users = await User.find({}, "name email");
    res.status(200).send({
      status: 200,
      message: "User List sent",
      data: users,
    });
  } catch (error) {
    logger.error(error);
    res.status(400).send({
      status: 400,
      message: error.message,
      data: {},
    });
  }
};
module.exports = {
  getAllTasks,
  createTask,
  updateSubTask,
  updateTask,
  deleteTask,
  getSubTasks,
  createUser,
  getUser,
};
