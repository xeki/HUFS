require('express-async-errors')
const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const logger = require('../util/logger')

const saltRounds = 10

userRouter.post('/users/login', async (req, res) => {
  const {userName, password} = req.body
  const user = await User.findOne({userName})
  if (!userName || !user) {
    return res.status(400).json({message: `id: ${userName} is missing or wrong`})
  } else {
    logger.info('User', user.toJSON())
    const valid = await bcrypt.compare(password, user.hashedPassword)
    if (!valid) return res.status(403).json({message: 'unauthorized'})
    const authToken = jwt.sign({userName: user.userName, id: user._id}, process.env.SECRET)
    res.status(200).json({user: user.toJSON(), authToken})
  }
})

userRouter.get('/users', async (req, res) => {
  const users = await User.find({}).populate('blogs')
  res.status(200).json(users.map(user => user.toJSON()))
})

userRouter.get('/users/:id', async (req, res) => {
  const {id} = req.params
  const user = await User.findOne({_id: id}).populate('blogs')
  res.status(200).json({user})
})

userRouter.post('/users', async (req, res) => {
  const {userName, name, password} = req.body
  if (!userName || !password) return res.status(400).json({message: 'username or password meaning'})
  const hashedPassword = await bcrypt.hash(password, saltRounds)
  const user = new User({userName, name, hashedPassword})
  const newUser = await user.save()
  if (!newUser) return res.status(400).json({message: 'unable to create a new user'})
  res.status(200).json(newUser.toJSON())
})

module.exports = userRouter
