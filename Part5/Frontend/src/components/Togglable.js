import React, { useState } from 'react'
import propTyes from 'prop-types'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)
  const showWhenHidden = { display: !visible ? 'block': 'none' }
  const showWhenVisible = { display: visible ? 'block' : 'none' }
  const toggleView = () => setVisible(!visible)

  return <div>
    <div style={showWhenHidden} id='button-container'>
      <button onClick={toggleView} id='show-button'>{props.buttonLabel}</button>
    </div>
    <div id='content' style={showWhenVisible}>
      {props.children}
      <button id='hide-button' style={{ marginTop: '5px' }} onClick={toggleView}>Cancel</button>
    </div>
  </div>
}

Togglable.prototype = {
  buttonLabel: propTyes.string,
  children: propTyes.array
}
export default Togglable
