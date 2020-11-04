import React, { useState } from 'react'
import propTypes from 'prop-types'
import {Button} from '@material-ui/core'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)
  const showWhenHidden = { display: !visible ? 'block': 'none' }
  const showWhenVisible = { display: visible ? 'block' : 'none' }
  const toggleView = () => setVisible(!visible)

  return <div>
    <div style={showWhenHidden} id='button-container'>
      <Button color='primary' variant="contained" onClick={toggleView} id='show-button'>{props.buttonLabel}</Button>
    </div>
    <div id='content' style={showWhenVisible}>
      {props.children}
      <Button id='hide-button' variant="contained" style={{ marginTop: '5px' }} onClick={toggleView}>Cancel</Button>
    </div>
  </div>
}

Togglable.prototype = {
  buttonLabel: propTypes.string,
  children: propTypes.array
}
export default Togglable
