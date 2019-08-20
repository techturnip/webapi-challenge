// SERVER SETUP ===================================|
// ================================================|

// IMPORTS/INITIALIZATION =========================|
// ================================================|
// import express ---------------------------------|
const express = require('express')
// import morgan to log requests to console -------|
const logger = require('morgan')
// import helmet to protect headers ---------------|
const helmet = require('helmet')
// import cors ------------------------------------|
const cors = require('cors')
// intialize express server -----------------------|
const server = express()
// intialize the body parser module ---------------|
const bodyParser = express.json()
// bring in routers -------------------------------|
const projectRouter = require('../projects/projectRouter.js')
const actionRouter = require('../actions/actionRouter.js')
// ------------------------------------------------|
// GLOBAL MIDDLEWARE ==============================|
// ================================================|
// bring in body parser module as middleware ------|
server.use(bodyParser)
// bring in cors ----------------------------------|
server.use(cors())
// bring in helmet --------------------------------|
server.use(helmet())
// bring in custom middleware - defined below -----|
server.use(logger('combined'))
// setup router endpoints -------------------------|
server.use('/api/projects/', projectRouter)
server.use('/api/actions/', actionRouter)
// ------------------------------------------------|
// DEFINE ROOT ROUTE ==============================|
// ================================================|
server.get('/', (req, res) => {
  res.send(`<h2>Don't worry be happy!</h2>`)
})
// ------------------------------------------------|
// EXPORT SERVER ==================================|
// ================================================|
module.exports = server
