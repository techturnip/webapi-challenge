// dotenv for environment variable setup
require('dotenv').config()

// bring in express server
const server = require('./api/server.js')

// define a port to listen on
const port = process.env.PORT || 4000

// call the listen() method on the server
server.listen(port, () => {
  console.log(`\n*** Server Running on Port ${port} ***\n`)
})
