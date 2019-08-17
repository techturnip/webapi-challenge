// IMPORTS/INITIALIZATION =========================|
// ================================================|
// import express router --------------------------|
const router = require('express').Router()
// bring in DB operations -------------------------|
const Projects = require('./projectModel.js')
// bring in custom middleware ---------------------|
const {
  validateProjectId,
  validateProject
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
// CUSTOM MIDDLEWARE ==============================|
// ================================================|

// ------------------------------------------------|
// EXPORT ROUTER ==================================|
// ================================================|
module.exports = router
