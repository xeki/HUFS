require('express-async-errors')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/blogs', async (request, response) => {
  const blogs = await Blog.find({})
  response.status(200).json(blogs)
})

blogRouter.post('/blogs', async (request, response) => {
  const newBlog = request.body
  newBlog.likes = newBlog.likes || 0
  if (!newBlog.title || !newBlog.url) {
    response.status(400).json({message: 'Missing required field(s)'})
  } else {
    const blog = new Blog(newBlog)
    const result = await blog.save()
    response.status(201).json(result)
  }
})

blogRouter.delete('/blogs/:id', async (req, res) => {
  const id = req.params.id
  const deletedBlog = await Blog.findByIdAndRemove(id)
  if (deletedBlog) {
    res.status(204).end()
  }
  res.status(400).end()
})

blogRouter.put('/blogs/:id', async (req, res) => {
  const id = req.params.id
  const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {new: true})
  res.status(200).json(updatedBlog)
  res.status(500).send()
})

module.exports = blogRouter
