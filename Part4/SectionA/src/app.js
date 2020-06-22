const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const {error, unknownPath, requestLogger} = require('./util/middlewares')
const config = require('./util/config')
const blogRouter = require('./controllers/blogRouter')

mongoose.connect(config.MONGO_DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})


const app = express()
app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use('/app', blogRouter)
app.use(unknownPath)
app.use(error)

module.exports = app
