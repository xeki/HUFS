const express = require('express');
const morgan = require('morgan');
const {persons} = require('./helper');

let personsList = persons.slice();
const app = express();

app.use(express.json());

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'));

const PORT = 3001;

app.post('/api/persons', (req, res) => {
  const person = req.body;
  if (person.name && person.number) {
    const duplicatedName = personsList.find(p => p.name === person.name);
    if (duplicatedName) {
      return res.status(400).json({error: "name must be unique"});
    }
    const id = Math.floor(Math.random()*Math.pow(10,5));
    personsList.push({...person, id});
    res.status(201).json({...person, id});
  } else {
    res.status(400).json({error: "name and number fields are required"})
  }
})

app.get('/api/persons', (req, res) => {
  res.json(personsList);
})

app.get('/info', (req, res) => {
  res.send(`Phonebook has info for ${personsList.length} people \n\n${new Date()}`);
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = personsList.find(person => person.id === id);

  if (person) {
    res.status(200).json(person);
  } else {
    res.status(404).send(`Sorry, person with id: ${id} could not be found`)
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);

  personsList = personsList.filter(person => person.id !== id);

  res.status(204).end();

})
app.listen(PORT, () => {console.log(`Listening at port ${PORT}`)});

