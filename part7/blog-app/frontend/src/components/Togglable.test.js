import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Togglable from './Togglable'

describe('Togglable component', () => {
  let component
  beforeEach(() => {
    component = render(<Togglable>
      <div className='.child' />
    </Togglable>)
  })
  test('renders without crashing', () => {
    expect(component.container.querySelector('.child')).toBeDefined()
  })

  test('show button is visible', () => {
    expect(component.container.querySelector('#button-container')).toHaveStyle('display: block')
  })

  test('show button is hidden after click', () => {
    const showButton = component.container.querySelector('#show-button')
    fireEvent.click(showButton)
    expect(component.container.querySelector('#button-container')).toHaveStyle('display: none')
    expect(component.container.querySelector('#content')).toHaveStyle('display: block')
  })

  test('content is hidden after clicking hide button', () => {
    const showButton = component.container.querySelector('#show-button')
    fireEvent.click(showButton)
    const hideButton = component.container.querySelector('#hide-button')
    fireEvent.click(hideButton)
    expect(component.container.querySelector('#content')).toHaveStyle('display: none')
  })
})