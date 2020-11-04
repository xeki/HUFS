import React, {useState} from 'react'
import {Button, TextField} from '@material-ui/core'

const AddBlog = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

const { authToken } = props.auth
  const resetBlogInputs = () => {
    setTitle('')
    setAuthor('')
    setBlogUrl('')
  }

  const createBlog = async (e) => {
    e.preventDefault()
    await props.addNote({ title, author, token: authToken, url: blogUrl })
    resetBlogInputs()
  }


  const handleChange = (name, value) => {
    if (name === 'title') {
      setTitle(value)
    } else if (name === 'author') {
      setAuthor(value)
    } else {
      setBlogUrl(value)
    }
  }

  return(<div>
    <form onSubmit={createBlog}>
      <div>
        <TextField required type='text' placeholder='title' id='title' name='title' value={title} onChange={({ target }) => handleChange('title', target.value)} />
      </div>
      <div>
        <TextField required type='text' placeholder='author' id='author' name='author' value={author} onChange={({ target }) => handleChange('author', target.value)} />
      </div>
      <div>
        <TextField required type='text' placeholder='url' id='url' name='url' value={blogUrl} onChange={({ target }) => handleChange('url', target.value)} />
      </div>
      <Button color='primary' variant='contained' id='createBlogButton' name='submit' type='submit'>Create Blog</Button>
    </form>
  </div>)
}

export default AddBlog
