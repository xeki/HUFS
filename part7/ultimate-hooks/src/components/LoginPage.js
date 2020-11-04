import React, {useState} from 'react'

const LoginPage = (props) => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    return ({userName, password})
  }
  const handleOnChange = (e, name) => {
    e.preventDefault()
    if (name === 'userName') {
      setUserName(e.target.value)
    } else {
      setPassword(e.target.value)
    }
  }

  return (<div>
    <form onSubmit={handleSubmit}>
      <input name='userName' placeholder='userName' id='userName' value={userName} onChange={(e)=>handleOnChange(e, 'userName')}/>
      <input name='password' placeholder='password' id='password' value={password} onChange={(e)=>handleOnChange(e, 'password')}/>
      <button type='submit'>Login</button>
    </form>
  </div>)

}