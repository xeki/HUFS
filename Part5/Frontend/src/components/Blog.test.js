import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import { BlogDetails } from './Blog'

describe('Blog test', () => {
  const blog = { title: 'blog title', url: 'blog url', likes: 10, autor: 'blog author' }
  const toggleView = jest.fn()
  const updateBlogLikes = jest.fn()
  const deleteBlog = jest.fn()
  const props = { blog, toggleView, updateBlogLikes, deleteBlog }

  test('Render without crashing', () => {
    const component = render(<BlogDetails {...props} />)
    const hideButton = component.getByText('Hide')
    const removeButton = component.getByText('Remove')
    fireEvent.click(hideButton)
    fireEvent.click(removeButton)
    expect(component.container).toHaveTextContent(blog.title)
    expect(toggleView.mock.calls).toHaveLength(1)
    expect(deleteBlog.mock.calls).toHaveLength(1)
  })

  test('Blog does not display url and likes', () => {
    const component = render(<BlogDetails {...props} />)
    const blogParagraphs = component.container.querySelectorAll('p')
    expect(blogParagraphs[0]).toHaveStyle('display: block')
    expect(blogParagraphs[1]).toHaveStyle('display: block')
    expect(blogParagraphs[2]).toHaveStyle('display: none')
    expect(blogParagraphs[3]).toHaveStyle('display: none')
  })

  test('Toggles detail view on button click', () => {
    const component = render(<BlogDetails {...props} />)
    const toggleViewButton = component.container.querySelector('#toggleDetails')
    const parags = component.container.querySelectorAll('p')
    expect(parags[0]).toHaveStyle('display: block')
    expect(parags[3]).toHaveStyle('display: none')
    fireEvent.click(toggleViewButton)
    expect(parags[2]).toHaveStyle('display: block')
    expect(parags[3]).toHaveStyle('display: block')
  })

  test('like button clicked twice', () => {
    const component = render(<BlogDetails {...props} />)
    const likeButton = component.container.querySelector('#like-button')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(updateBlogLikes.mock.calls).toHaveLength(2)
  })
})