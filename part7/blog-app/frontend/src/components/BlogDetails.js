import React from 'react'
import propTypes from 'prop-types'
import CAddComment from '../containers/CAddComment'
import { Button } from '@material-ui/core'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import DeleteIcon from '@material-ui/icons/Delete'

const BlogDetails = (props) => {
  const { userId } = props.location.data
  const {blog} = props
  if (!blog) return <div>No blog, waiting ...</div>
  const bloggerId = blog.user && blog.user.id ? blog.user.id : blog.user

  const displayComments = comments => (<ul>{comments.map((comment, index) => <li key={index}>{comment.comment}</li>)}</ul>)

  const handleBlogDelete = async () => {
    await props.deleteBlog(blog.id, props.token)
    props.history.goBack()
  }
  return <div>
    <div className='blog-details-container'>
      <div className='left-blog-details'>
        <div>
          <p className='title'><strong>Title: </strong>{blog.title}</p>
        </div>
        <p><strong>Author: </strong>{blog.author}</p>
        <p id='url'><strong>Url: </strong>{blog.url}</p>
        <p id='likes'>
          <strong>Likes: </strong>{blog.likes}
          {userId === bloggerId &&(
            <Button 
              id='like-button' 
              color='primary' 
              variant='contained' 
              startIcon={<ThumbUpIcon />} 
              onClick={() => props.updateBlogLikes({ ...blog, likes: blog.likes + 1 }, props.token)}
            >
              Like
            </Button>)}
        </p>
        <div><strong>Comments: </strong></div>
        {displayComments(blog.comments)}
        <CAddComment id={blog.id} />
      </div>
      <div className='right-blog-details'>
        {userId === bloggerId && (
        <Button 
          color='secondary' 
          variant='contained'
          startIcon={<DeleteIcon />}
          id='deleteBlog' 
          onClick={handleBlogDelete}
        >
          Remove
        </Button>)}
      </div>
    </div>
    <div className='padded-div' onClick={() => props.history.goBack()}><Button variant='contained' >Back to blog list</Button></div>
  </div>
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

export default BlogDetails
