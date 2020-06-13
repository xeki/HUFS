const axios = require('axios');

const URL = 'http://localhost:3000/persons';

const getPersons = () => { 
  axios.get(URL)
  .then(r => r.data)
  .catch(e => console.log('Error: ', e));
}

const persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  }
]
module.exports = {getPersons, persons};