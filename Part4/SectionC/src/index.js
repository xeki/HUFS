const http = require('http')
const app = require('./app')
const {PORT} = require('./util/config')

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})