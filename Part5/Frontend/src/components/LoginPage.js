import React from 'react'
import propTyes from 'prop-types'

const LoginForm = ({ userName, password, handleChange, submitForm }) =>
  (<div>
    <h3>Log in page</h3>
    <div>
      <input
        id='userName'
        type='text'
        name='userName'
        placeholder='user
        name' value={userName}
        onChange={({ target }) => handleChange('userName', target.value)}
      />
    </div>
    <div>
      <input
        id='password'
        type='password'
        name='password'
        placeholder='password'
        value={password} onChange={({ target }) => handleChange('password', target.value)}
      />
    </div>
    <div>
      <button
        id='loginButton'
        type='submit'
        onClick={submitForm}
      >
        Log in
      </button>
    </div>
  </div>)

LoginForm.prototype = {
  userName: propTyes.string,
  password: propTyes.string,
  handleChange: propTyes.func,
  submitForm: propTyes.func
}
export { LoginForm }
