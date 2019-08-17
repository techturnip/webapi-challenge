// IMPORTS/INITIALIZATION =========================|
// ================================================|
// import express router --------------------------|
const router = require('express').Router()
// bring in DB operations -------------------------|
const Actions = require('./actionModel.js')
// bring in custom middleware ---------------------|
const { validateActionId } = require('../middleware/routerMiddleware.js')
// ------------------------------------------------|
// REQ HANDLERS ===================================|
// ================================================|
// Base URL '/api/actions/' -----------------------|
// ------------------------------------------------|
// GET Request returns an array of all actions ----|
router.get('/', async (req, res) => {
  try {
    const actions = await Actions.get()

    res.status(200).json(actions)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Could not retrieve projects from database'
    })
  }
})
// ------------------------------------------------|
// GET Request returns an action by id ------------|
router.get('/:id', validateActionId, async (req, res) => {
  try {
    const actions = await Actions.get(req.action.id)

    res.status(200).json(actions)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Could not retrieve projects from database'
    })
  }
})

// ------------------------------------------------|
// EXPORT ROUTER ==================================|
// ================================================|
module.exports = router
