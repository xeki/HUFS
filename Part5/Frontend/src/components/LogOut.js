import React from 'react'
import propTyes from 'prop-types'

const LogOutForm = (props) => <div>
  <h3>
    {`Logged in user: ${props.name}`}
    <button id='logoutButton' type='button' name='logout' onClick={props.logOutUser}>Log out</button>
  </h3>
</div>

LogOutForm.prototype = {
  name: propTyes.string,
  logOutUser: propTyes.func
}

export { LogOutForm }
