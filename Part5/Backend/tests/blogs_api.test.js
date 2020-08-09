const app = require('../src/app')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../src/models/blog')
const User = require('../src/models/user')
const helpers = require('./util/test_helper')

const api = supertest(app)
let loggedUser
beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  const temp = await api.post('/api/users').send(helpers.initialUser)
  loggedUser = temp ? temp.body : {}
  await Promise.all(
    helpers.initialBlogs.map(b => {
      const blog = new Blog({...b, user: loggedUser.id})
      return blog.save()
    })
  )
})

describe('Fetch API works well', () => {
  test('Fetches all blogs', async () => {
    const blogs = await api.get('/app/blogs')
    expect(blogs.body.length).toBe(helpers.initialBlogs.length)
  })
})

describe('Post API works well', () => {
  test('Posts a new blog post', async () => {
    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    }
    const authToken = helpers.generateAuthToken(loggedUser)
    const result = await api.post('/app/blogs').send(newBlog).set('x-auth', authToken)
    expect(result.status).toBe(201)
    const blogs = await api.get('/app/blogs')
    expect(blogs.body.length).toBe(helpers.initialBlogs.length + 1)

  })

})

describe('Delete API works well', () => {
  test('Removes blog by id', async () => {
    const authToken = helpers.generateAuthToken(loggedUser)
    const blogs = await api.get('/app/blogs')
    const id = blogs.body[0].id
    const deletedBlog = await api.delete(`/app/blogs/${id}`).set('x-auth', authToken)
    expect(deletedBlog.status).toBe(204)
  })
})

describe('Update API works well', () => {
  test('Updates blog by id', async () => {
    const blogs = await api.get('/app/blogs')
    const id = blogs.body[0].id
    const editedBlog = {title: 'Edited title', url:'new url', author: 'unknown', likes: 100}
    const authToken = helpers.generateAuthToken(loggedUser)
    const updatedBlog = await api.put(`/app/blogs/${id}`).send(editedBlog).set('x-auth', authToken)
    expect(updatedBlog.status).toBe(200)
    expect(updatedBlog.body.likes).toBe(100)
  })
})

afterAll( async () => {
  await mongoose.connection.close()
})