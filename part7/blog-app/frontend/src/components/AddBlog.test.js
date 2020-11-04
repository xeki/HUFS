import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import { AddBlog } from './AddBlog'

describe('Add blog', () => {
  test('handle change called with right parameters', () => {
    const handleChange = jest.fn()
    const createBlog = jest.fn()
    const props = { title: 'title', author: 'author', url: 'url', handleChange, createBlog }
    const component = render(<AddBlog {...props} />)
    const titleInput = component.container.querySelector('#title')
    fireEvent.change(titleInput, { target: { value: 'new title' } })
    expect(handleChange.mock.calls[0][0]).toEqual('title')
    expect(handleChange.mock.calls[0][1]).toEqual('new title')
  })
})