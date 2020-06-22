const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const {error, unknownPath, requestLogger, getAuthorizationToken} = require('./util/middlewares')
const config = require('./util/config')
const blogRouter = require('./controllers/blogRouter')
const userRouter = require('./controllers/userRouter')

mongoose.connect(config.MONGO_DB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})


const app = express()
app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(getAuthorizationToken)
app.use('/app', blogRouter)
app.use('/api', userRouter)
app.use(unknownPath)
app.use(error)

module.exports = app
