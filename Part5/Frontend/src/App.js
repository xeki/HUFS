import React, { useState } from 'react'
import './App.css'
import Blog from './components/Blog'
import blogService from './services/blogs'
import { authenticate } from './services/userAccess'
import { LoginForm } from './components/LoginPage'
import { LogOutForm } from './components/LogOut'
import { AddBlog } from './components/AddBlog'
import Togglable from './components/Togglable'

const App = () => {
  const loggedUser = localStorage.getItem('user')
  const [userName, setUserName] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [message, setMessage] = useState('')
  const [waiting, setWaiting] = useState(false)
  const [messageClass, setMessageClass] = useState('hide')
  const [user, setUser] = useState(loggedUser ? JSON.parse(loggedUser) : null)
  const [blogs, setBlogs] = useState([])

  const getAllBlogs = async () => {
    setWaiting(true)
    const blogs = await blogService.getAll()
    setWaiting(false)
    setBlogs( blogs.sort((a,b) => b.likes - a.likes) )
  }

  const updateBlogLikes = async (blog) => {
    setWaiting(true)
    const updatedBlog = await blogService.updateBlog(blog, user.authToken)
    setWaiting(false)
    const updatedBlogs = blogs.map(b => b.id === blog.id ? updatedBlog.data : b)
    setBlogs( updatedBlogs.sort((a,b) => b.likes - a.likes) )
  }

  const deleteBlog = async (id, title) => {
    const ans = window.confirm(`Delete blog: ${title}?`)
    if (ans) {
      setWaiting(true)
      await blogService.deleteBlog(id, user.authToken)
      setWaiting(false)
      const latestBlogs = blogs.filter(b => b.id !== id )
      setBlogs( latestBlogs.sort((a,b) => b.likes - a.likes) )
    }
  }

  const resetBlogInputs = () => {
    setTitle('')
    setAuthor('')
    setBlogUrl('')
  }

  const createBlog = async () => {
    if (author.trim() === '' || title.trim() === '') {
      setMessage('Author and title values can not be left empty')
      setMessageClass('message error')
    } else {
      resetBlogInputs()
      setWaiting(true)
      let newBlog
      try {
        newBlog = await blogService.addBlog({ title, author, token: user.authToken, url: blogUrl })
        setWaiting(false)
        if (newBlog) {
          setMessage('new blog successfully created')
          setMessageClass('message success')
          await getAllBlogs()
        }
      } catch (e){
        setWaiting(false)
        setMessage('Error has occurred while creating new blog')
        setMessageClass('message error')
      }
    }
    setTimeout(() => {
      setMessageClass('hide')
    }, 1500)
  }

  const handleChange = (name, value) => {
    if (name === 'userName') {
      setUserName(value)
    } else {
      setPassword(value)
    }
  }

  const displayBlogs = () =>
    (<> <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          updateBlogLikes={updateBlogLikes}
          deleteBlog={deleteBlog}
          userId={user.id}
        />
      )}
    </>)

  const handleBlogChange =(name, value) => {
    if (name === 'title') {
      setTitle(value)
    } else if (name === 'author'){
      setAuthor(value)
    } else {
      setBlogUrl(value)
    }
  }

  const logOutUser = () => {
    localStorage.clear()
    setUser(null)
  }

  const submitLoginForm = async () => {
    if (userName.trim() === '' || password.trim() === '') {
      setMessage('User name or password can not be empty')
      setMessageClass('message error')
    } else {
      setUserName('')
      setPassword('')
      setWaiting(true)
      let authorizedUser
      try {
        authorizedUser = await authenticate({ userName, password })
        setWaiting(false)
        if (authorizedUser) {
          localStorage.setItem('user', JSON.stringify(authorizedUser))
          setUser(authorizedUser)
          setMessage('User authenticated successfully')
          setMessageClass('message success')
          !blogs.length && getAllBlogs()
        } else {
          localStorage.clear()
          setUser(null)
          setMessage('Authentication failed')
          setMessageClass('message error')
        }
      } catch(e) {
        localStorage.clear()
        setUser(null)
        setMessage('Authentication failed')
        setMessageClass('message error')
        setWaiting(false)
      }
    }
    setTimeout(() => setMessageClass('hide'), 1500)
  }

  const renderPage = () => {
    if (!user) {
      return <Togglable buttonLabel='Show Login Page'>
        <LoginForm userName={userName} password={password} handleChange={handleChange} submitForm={submitLoginForm} />
      </Togglable>
    } else {
      return  <>
        <LogOutForm name={user.name} logOutUser={logOutUser} handleChange={handleBlogChange} />
        <Togglable buttonLabel='create blog'>
          <AddBlog title={title} author={author} url={blogUrl} createBlog={createBlog} handleChange={handleBlogChange} />
        </Togglable>
        {displayBlogs()}
      </>
    }
  }
  return (
    <div>
      {waiting ? <p> waiting ... </p> :<>
        <p id='message' className={messageClass}>{message}</p>
        {renderPage()}
      </>}
    </div>)
}

export default App
