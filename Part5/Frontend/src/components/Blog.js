import React, { useState } from 'react'
import propTypes from 'prop-types'

export const BlogDetails = (props) => {
  const { blog } = props
  const deleteButtonStyle = { color: 'red', border: '1px solid red' }
  const [showDetails, setShowDetails] = useState(false)
  const detailsStyle = { display: showDetails ? 'block' : 'none' }
  const bloggerId = blog.user && blog.user.id ? blog.user.id : blog.user

  return <div style={{ marginLeft: '7px', paddingTop: '5px', paddingBottom: '5px' }}>
    <div>
      <p className='title'>{blog.title}</p>
      <button id='hideDetail' style={{ marginLeft: '5px' }} onClick= {props.toggleView}>Hide</button>
    </div>
    <p>{blog.author}</p>
    <button id='toggleDetails' onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'Hide details' : 'Show details'}</button>
    <p style={detailsStyle} id='url'>{blog.url}</p>
    <p style={detailsStyle} id='likes'>
      {blog.likes}
      <button id='like-button' onClick={() => props.updateBlogLikes({ ...blog, likes: blog.likes + 1 })}>Like</button>
    </p>
    {props.userId === bloggerId && <button id='deletBlog' style={deleteButtonStyle} onClick={() => props.deleteBlog(blog.id, blog.title)}>Remove</button>}
  </div>
}
const Blog = ({ blog, updateBlogLikes, deleteBlog, userId }) => {
  const [show, setShow] = useState(false)
  const toggleView = () => setShow(!show)
  return(<div className='blogs'>
    <div className='blog'>
      {!show && <p>
        {blog.title}, {blog.author}
        <button id='viewDetail' style={{ marginLeft: '10px' }} onClick={toggleView}>View</button>
      </p>}
      {show && <BlogDetails
        deleteBlog={deleteBlog}
        toggleView={toggleView}
        blog={blog}
        updateBlogLikes={updateBlogLikes}
        userId={userId}
      />}
    </div>
  </div>)
}
BlogDetails.prototype = {
  deleteBlog: propTypes.func,
  toggleView: propTypes.func,
  blog: propTypes.shape({
    title: propTypes.string,
    author: propTypes.string,
    url: propTypes.string,
    likes: propTypes.number,
    id: propTypes.string
  }),
  updateBlogLikes: propTypes.func,
  userId: propTypes.string
}

Blog.prototype = {
  blog: propTypes.shape({
    title: propTypes.string,
    author: propTypes.string,
    url: propTypes.string,
    likes: propTypes.number,
    id: propTypes.string
  }),
  updateBlogLikes: propTypes.func,
  deleteBlog: propTypes.func,
  userId: propTypes.string
}

export default Blog
