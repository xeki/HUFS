import React, {useState} from 'react'
import propTypes from 'prop-types'
import {Redirect, Link} from 'react-router-dom'
import {TextField, Button} from '@material-ui/core'

const LoginForm = ({ user, authToken, loginPerson }) => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const submitForm = async (e) => {
    e.preventDefault()
    if (userName.trim() !== '' && password.trim() !== '') {
      await loginPerson(userName, password)
    }
  }
  if (user && authToken) {
    return <Redirect to='/user/list' />
  }
  return (<div>
    <div className='padded-div'><Link to='/new'>Add new person</Link></div>
    <h3>Log in page</h3>
    <form onSubmit={submitForm}>
      <div>
        <TextField
          required
          id='userName'
          type='text'
          name='userName'
          placeholder='user name' 
          value={userName}
          onChange={({ target }) => setUserName(target.value)}
        />
      </div>
      <div>
        <TextField
          required
          id='password'
          type='password'
          name='password'
          placeholder='password'
          value={password} onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <div className='padded-div'>
        <Button
          variant='contained'
          color='primary'
          id='loginButton'
          type='submit'
        >
          Log in
        </Button>
      </div>
    </form>
  </div>)
}

LoginForm.prototype = {
  userName: propTypes.string,
  password: propTypes.string,
  handleChange: propTypes.func,
  submitForm: propTypes.func
}
export default LoginForm
