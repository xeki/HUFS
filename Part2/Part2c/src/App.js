import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Phone from './Phone'


const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then(response => setPersons(response.data))
    .catch(err => setPersons([]))
  }, [])
  console.log('Persons', persons)
  return <Phone persons={persons} />
}

export default App;