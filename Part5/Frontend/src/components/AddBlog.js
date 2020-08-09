import React from 'react'
import propTypes from 'prop-types'
const AddBlog = (props) => (<div>
  <div>
    <input type='text' placeholder='title' id='title' name='title' value={props.title} onChange={({ target }) => props.handleChange('title', target.value)} />
  </div>
  <div>
    <input type='text' placeholder='author' id='author' name='author' value={props.author} onChange={({ target }) => props.handleChange('author', target.value)} />
  </div>
  <div>
    <input type='text' placeholder='url' id='url' name='url' value={props.url} onChange={({ target }) => props.handleChange('url', target.value)} />
  </div>
  <button id='createBlogButton' name='submit' type='submit' onClick={props.createBlog}>Create Blog</button>
</div>)

AddBlog.prototype = {
  title: propTypes.string,
  author: propTypes.string,
  url: propTypes.string,
  createBlog: propTypes.func
}
export { AddBlog }
