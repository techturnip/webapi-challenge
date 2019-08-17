module.exports = {
  validateProjectId,
  validateProject
}

// Import project model ---------------------------|
const Projects = require('../projects/projectModel.js')
const Actions = require('../actions/actionModel.js')
// ------------------------------------------------|
// CUSTOM MIDDLEWARE ==============================|
// ================================================|
function validateProjectId(req, res, next) {
  const { id } = req.params

  Projects.get(id)
    .then(project => {
      if (project) {
        req.project = project
        next()
      } else {
        res.status(404).json({ message: 'Invalid project id' })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: 'Error processing request'
      })
    })
}
// ------------------------------------------------|
function validateProject(req, res, next) {
  if (req.body && Object.keys(req.body).length > 0) {
    const { name, description } = req.body

    if (name && description) {
      if (
        name.length > 2 &&
        typeof name === 'string' &&
        description.length > 2 &&
        typeof description === 'string'
      ) {
        next()
      } else {
        res.status(400).json({
          message:
            'Name and description fields must be strings and cannot be empty'
        })
      }
    } else {
      res
        .status(400)
        .json({ message: 'Missing required name and/or description field' })
    }
  } else {
    res.status(400).json({ message: 'Missing project data' })
  }
}
// ------------------------------------------------|
function validateActionId(req, res, next) {
  const { id } = req.params

  Projects.get(id)
    .then(action => {
      if (action) {
        req.action = action
        next()
      } else {
        res.status(404).json({ message: 'Invalid action id' })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: 'Error processing request'
      })
    })
}
