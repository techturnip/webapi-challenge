// IMPORTS/INITIALIZATION =========================|
// ================================================|
// import express router --------------------------|
const router = require('express').Router()
// bring in DB operations -------------------------|
const Projects = require('./projectModel.js')
const Actions = require('../actions/actionModel.js')
// bring in custom middleware ---------------------|
const {
  validateProjectId,
  validateProject,
  validateActionPost
} = require('../middleware/routerMiddleware.js')
// ------------------------------------------------|
// REQ HANDLERS ===================================|
// ================================================|
// Base URL '/api/projects/'
// ------------------------------------------------|
// GET Request returns an array of projects -------|
router.get('/', async (req, res) => {
  try {
    const projects = await Projects.get()

    res.status(200).json(projects)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Could not retrieve projects from database'
    })
  }
})
// ------------------------------------------------|
// GET Request returns a project by id ------------|
router.get('/:id', validateProjectId, async (req, res) => {
  try {
    res.status(200).json(req.project)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Could not retrieve projects from database'
    })
  }
})
// ------------------------------------------------|
// POST Request creates a new project in db -------|
router.post('/', validateProject, async (req, res) => {
  try {
    const newProject = await Projects.insert(req.body)

    res.status(200).json(newProject)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Could not create new project in database'
    })
  }
})
// ------------------------------------------------|
// POST Request creates a new action in db for the
// specified project by id ------------------------|
router.post('/:id', validateActionPost, async (req, res) => {
  try {
    const newAction = await Actions.insert(req.body)

    res.status(200).json(newAction)
  } catch (error) {
    res.status(500).json({
      message: 'Could not create action for specified project'
    })
  }
})
// ------------------------------------------------|
// PUT Request updates a project in db ------------|
router.put('/:id', validateProjectId, validateProject, async (req, res) => {
  try {
    const updatedProject = await Projects.update(req.project.id, req.body)
    res.status(200).json(updatedProject)
  } catch (error) {
    res.status(500).json({
      message: 'Could not update specified project in database'
    })
  }
})
// ------------------------------------------------|
// DELETE Request removes a project in db ---------|
router.delete('/:id', validateProjectId, async (req, res) => {
  try {
    const deleteProject = await Projects.remove(req.project.id)

    res.status(200).json(req.project)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Could not remove specified project from database'
    })
  }
})
// ------------------------------------------------|
// EXPORT ROUTER ==================================|
// ================================================|
module.exports = router
