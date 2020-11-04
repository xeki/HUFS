import React, {useState} from 'react'
import {Link} from 'react-router-dom'

const AddPerson = (props) => {
  const [name, setName] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    if ([name, userName, password].every(e => e!=='')) {
      props.addPerson({name, userName, password})
    }
  }
  if (props.status === 'waiting') {
    return (<p> Operation is in progress ...</p>)
  }
  return (<div>
    <div className='padded-div'><Link to='/login'>Login page</Link></div>
    <h3>Add new Person</h3>
    <div>
      <input type='text' placeholder='name' id='name' name='name' value={name} onChange={({ target }) => setName(target.value)} />
    </div>
    <div>
      <input type='text' placeholder='userName' id='userName' name='userName' value={userName} onChange={({ target }) => setUserName(target.value)} />
    </div>
    <div>
      <input type='password' placeholder='password' id='password' name='password' value={password} onChange={({ target }) => setPassword(target.value)} />
    </div>
    <button id='createPersonButton' name='submit' type='submit' onClick={handleSubmit}>Create Person</button>
</div>)}

export default AddPerson
