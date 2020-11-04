import React from 'react'
import propTypes from 'prop-types'
import {Link} from 'react-router-dom'

const Blog = ({ blog, userId }) => {
  return(<div className='blogs'>
    <div className='blog'>
      <p>
        <Link to={{
          pathname:`/user/blog/${blog.id}`,
          data:{userId}
         }} >{blog.title}, {blog.author} </Link>
      </p>
    </div>
  </div>)
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
