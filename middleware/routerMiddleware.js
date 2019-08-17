module.exports = {
  validateProjectId,
  validateProject,
  validateActionId,
  validateActionPost,
  validateActionUpdate
}
// Import project model ---------------------------|
const Projects = require('../projects/projectModel.js')
const Actions = require('../actions/actionModel.js')
// ------------------------------------------------|
// CUSTOM MIDDLEWARE ==============================|
// ================================================|
function validateProjectId(req, res, next) {
  const { id } = req.params

  // call to database to verify the ID
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
  // check for req.body
  if (req.body && Object.keys(req.body).length > 0) {
    const { name, description } = req.body

    // check if name and description exist
    if (name && description) {
      // make sure name and description are not empty and are both strings
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

  // call to database to verify the ID
  Actions.get(id)
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
// ------------------------------------------------|
function validateActionPost(req, res, next) {
  if (req.body && Object.keys(req.body).length > 0) {
    const { project_id, description, notes } = req.body
    // Make sure project_id is a valid project_id
    if (project_id === Number(req.params.id)) {
      // Make sure description and notes exist
      if (description && notes) {
        // check for valid description
        if (
          description.length > 2 &&
          description.length <= 128 &&
          typeof description === 'string'
        ) {
          // check for valid notes field
          if (notes.length > 2 && typeof notes === 'string') {
            // all checks have passed
            next()
          } else {
            res.status(400).json({
              message: 'Notes field must be a string and cannot be empty'
            })
          }
        } else {
          res.status(400).json({
            message:
              'Description field must be a string less than or equal to 128 characters and cannot be empty'
          })
        }
      } else {
        res.status(400).json({
          message: 'Missing required description and/or notes field'
        })
      }
    } else {
      res.status(400).json({
        message: 'The project_id field must match id in the url of your request'
      })
    }
  } else {
    res.status(400).json({
      message: 'Missing action data'
    })
  }
}
// ------------------------------------------------|
function validateActionUpdate(req, res, next) {
  if (req.body && Object.keys(req.body).length > 0) {
    const { description, notes } = req.body
    // Make sure description and notes exist
    if (description && notes) {
      // check for valid description
      if (
        description.length > 2 &&
        description.length <= 128 &&
        typeof description === 'string'
      ) {
        // check for valid notes field
        if (notes.length > 2 && typeof notes === 'string') {
          // all checks have passed
          next()
        } else {
          res.status(400).json({
            message: 'Notes field must be a string and cannot be empty'
          })
        }
      } else {
        res.status(400).json({
          message:
            'Description field must be a string less than or equal to 128 characters and cannot be empty'
        })
      }
    } else {
      res.status(400).json({
        message: 'Missing required description and/or notes field'
      })
    }
  } else {
    res.status(400).json({
      message: 'Missing action data'
    })
  }
}
