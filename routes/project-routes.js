//      routes/project-routes.js

const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Project = require('./../models/project-model');
const Task = require('./../models/task-model');

// POST '/api/projects'    => to post a new project
router.post('/projects', (req, res, next) => {
  const { title, description } = req.body;

  Project.create({ title, description, tasks: [] })
    .then(createdProject => {
      res.status(201).json(createdProject); //   .send(  JSON.stringify(createdProject)  )
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// GET '/api/projects'		 => to get all the projects
router.get('/projects', (req, res, next) => {
  Project.find()
    .populate('tasks')
    .then(allProjects => {
      res.status(200).json(allProjects);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// GET '/api/projects/:id'		 => to get a specific project
router.get('/projects/:id', (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(500).json({ message: 'Specified id is invalid' });
    return;
  }

  Project.findById(id)
    .then(foundProject => {
      res.status(200).json(foundProject);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// PUT '/api/projects/:id' 		=> to update a specific project
router.put('/projects/:id', (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!title || !description) {
    res.status(500).json({
      message: 'title and description field are mandatory',
    });
    return;
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(500).json({
      message: 'Specified id is invalid',
    });
    return;
  }

  Project.findByIdAndUpdate(id, { title, description })
    .then(() => {
      res.status(200).json({
        message: 'Project updated !',
      });
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// DELETE '/api/projects/:id'   => to delete a specific project
router.delete('/projects/:id', (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(500).json({
      message: 'Specified id is invalid',
    });
    return;
  }

  Project.findByIdAndRemove(id)
    .then(() => {
      res.status(202).json({ message: 'Project deleted' });
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;
