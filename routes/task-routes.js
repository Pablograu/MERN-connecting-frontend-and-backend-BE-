//      routes/task-routes.js

const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const Project = require("./../models/project-model");
const Task = require("./../models/task-model");

// GET '/api/projects/:projectId/tasks/:taskId'   => to retrieve a specific task
router.get("/projects/:projectId/tasks/:taskId", (req, res, next) => {
  const { taskId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    res.status(500).json({ message: "Specified task id is invalid" });
    return;
  }

  Task.findById(taskId)
    .then(foundTask => {
      res.status(200).json(foundTask);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// POST '/api/tasks'      => to create a new task
router.post("/tasks", (req, res, next) => {
  const { title, description, projectID } = req.body;

  Task.create({ title, description, project: projectID })
    .then(newTask => {
      return Project.findByIdAndUpdate(
        projectID,
        { $push: { tasks: newTask._id } },
        { new: true }
      ).populate("tasks");
    })
    .then(updatedProject => {
      res.status(201).json(updatedProject);
    })

    .catch(err => {
      res.status(400).json(err);
    });
});

// PUT '/api/tasks/:id'    => to update a specific task
router.put("/tasks/:id", (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(500).json({ message: "Specified task id is invalid" });
    return;
  }

  Task.findByIdAndUpdate(id, { title, description })
    .then(() => {
      res.status(201).json({ message: "Task updated" });
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// DELETE '/api/tasks/:id'     => to delete a specific task
router.delete("/tasks/:id", (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(500).json({ message: "Specified task id is invalid" });
    return;
  }

  Task.findByIdAndRemove(id)
    .then(() => {
      res.status(201).json({ message: "Task deleted" });
    })
    .catch(err => {
      res.status(400).json(err);
    });
});
module.exports = router;
