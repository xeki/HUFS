import React from 'react'
import {Link} from 'react-router-dom'
import Blog from './Blog'
import CAddNote from '../containers/CAddBlog'
import Togglable from './Togglable'
import { getNotesByPersonId} from '../util/personUtil'

const UserOwnBlogs = (props) => {
  const {id} = props.match.params
  const status = props.status
  const name = props.location.name
  const { updateNote, deleteNote, person, auth, blogs} = props

  const displayBlogs = () =>
    (<div className='padded-div'> <h2>{name}</h2>
      {getNotesByPersonId(blogs, id).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          updateBlogLikes={updateBlogLikes}
          deleteBlog={deleteBlog}
          userId={person.id}
        />
      )}
    </div>)

  const updateBlogLikes = async (blog) => {
    await updateNote(blog, auth.authToken)
  }

  const deleteBlog = async (id, title) => {
    const ans = window.confirm(`Delete blog: ${title}?`)
    if (ans) {
      await deleteNote(id, auth.authToken)
    }
  }

  if (status !== 'success') {
    return (<p>Person blog page ...</p>)
  } else {
    return (<div>
      <div className='padded-div'><Link to='/user/list'>Users List</Link></div>
      {auth.user.id === id && <Togglable buttonLabel='create blog'>
        <CAddNote />
      </Togglable>}
      {displayBlogs()}
    </div>)
  }  
}

export default UserOwnBlogs