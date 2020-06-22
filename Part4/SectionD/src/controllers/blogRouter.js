require('express-async-errors')
const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../util/logger')

blogRouter.get('/blogs', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.status(200).json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/blogs', async (request, response) => {
  const blogObj = request.body
  blogObj.likes = blogObj.likes || 0
  const authToken = request.authToken
  logger.info('Auth key: ', authToken)
  const decodedToken = authToken ? jwt.verify(authToken, process.env.SECRET) : authToken
  logger.info('Decoded token: ', decodedToken)
  if (!decodedToken || !decodedToken.id) {
    response.status(401).json({message: 'unauthorized use'})
  }
  let user = await User.findById(decodedToken.id)
  if (!blogObj.title || !blogObj.url || !user) {
    response.status(400).json({message: 'Missing required field(s)'})
  } else {
    const blog = new Blog(blogObj)
    let newBlog = await blog.save()
    newBlog.user = decodedToken.id
    user.blogs.push(newBlog._id.toString())
    await user.save()
    newBlog = await newBlog.save()
    response.status(201).json(newBlog)
  }
})

blogRouter.delete('/blogs/:id', async (req, res) => {
  const id = req.params.id
  let deletedBlog
  const blogToDelete = await Blog.findById(id)
  const decodedToken = jwt.verify(req.authToken, process.env.SECRET)
  if (!blogToDelete || decodedToken.id === blogToDelete.user.toString()) {
    deletedBlog = await Blog.findByIdAndRemove(id)
  } else {
    res.status(401).json({message: 'Unauthorized access'})
  }
  if (deletedBlog) {
    res.status(204).end()
  }
  res.status(400).end()
})

blogRouter.put('/blogs/:id', async (req, res) => {
  const id = req.params.id
  let updatedBlog
  const blogToUpdate = await Blog.findById(id)
  const decodedToken = jwt.verify(req.authToken, process.env.SECRET)
  if (!blogToUpdate || decodedToken.id === blogToUpdate.user.toString()) {
    updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {new: true})
  } else {
    res.status(401).json({'message': 'unauthorized'})
  }
  if (updatedBlog) return res.status(200).json(updatedBlog)
  res.status(400).send()
})

module.exports = blogRouter
