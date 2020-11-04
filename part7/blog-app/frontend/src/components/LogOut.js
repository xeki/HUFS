import React from 'react'
import propTypes from 'prop-types'
import {Button} from '@material-ui/core'

const LogOutForm = (props) => <div className='logout-container'>
  <div className='logout-left'>
    <h3>
      {`Logged in user: ${props.name}`}
    </h3>
  </div>
  <div className='logout-right'>
      <Button variant='contained' id='logoutButton' type='button' name='logout' onClick={props.logOutUser}>Log out</Button>
  </div>
</div>

LogOutForm.prototype = {
  name: propTypes.string,
  logOutUser: propTypes.func
}

export { LogOutForm }
