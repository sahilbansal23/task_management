const express = require("express");

const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

const bodyParser = require("body-parser");
const taskController = require("./controller/task_management");
const PORT = process.env.PORT || 3000;
// const mongo_str = "mongodb://localhost:27017/";
mongoose.connect(process.env.mongo_str, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

app.get("/tasks", taskController.getAllTasks);
app.post("/tasks", taskController.createTask);
app.put("/tasks/:taskId", taskController.updateTask);
app.delete("/tasks/:taskId", taskController.deleteTask);
app.get("/tasks/:taskId/subtasks", taskController.getSubTasks);
app.put("/tasks/:taskId/subtasks", taskController.updateSubTask);
app.post("/createUser",taskController.createUser);
app.get("/getuser",taskController.getUser);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
