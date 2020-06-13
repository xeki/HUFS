const express = require('express');
require('dotenv').config();
const Person = require('./Model/Person');

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

const handleContactUpdate = (req, res, next) => {
  const id = req.params.id;
  if (id) {
    try {
      const { name, number } = req.body;
      Person.findByIdAndUpdate(id, { name, number }, { new: true })
        .then(editedPerson => {
          res.status(200).json(editedPerson);
        }).catch(error => next(error));
    } catch (error) {
      next(error);
    }
  } else {
    const error = new Error('Id Param missing');
    next(error);
  }
};

app.get('/info', (req, res, next) => {
  Person.find({}).then(people => {
    res.send(`Phonebook has info for ${people.length} people \n\n${new Date()}`);
  }).catch(error => next(error));
});

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;
  if (id) {
    Person.findById(id).then(fetchedPerson => {
      res.json(fetchedPerson);
    }).catch(error => {
      next(error);
    });
  } else {
    res.status(400).json({'error': ' id parameter is missing'});
  }
});

app.get('/api/persons', (req, res, next) => {
  Person.find({}).then(people => {
    res.status(200).json(people);
  }).catch(error => next(error));
});

app.post('/api/persons', (req, res, next) => {
  const body = req.body;
  if (body === undefined) {
    res.status(400).json({error: ' json body missing from request'});
  } else {
    const {name, number} = body;
    Person.find({name}).then(existingPerson => {
      if (existingPerson.length) {
        console.log('Existing Person: ', existingPerson)
        req.params.id = existingPerson[0]._id;
        handleContactUpdate(req, res, next);
      } else {
        const person = new Person({ name, number });
        person.save().then(savedPerson => {
          res.status(200).json(savedPerson.toJSON());
        }).catch(err => {
          next(err);
        })
      }
    });
  }
});

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;
  if (id) {
    Person.findByIdAndRemove(id).then(() => {
      console.log(`Person with id: ${id} deleted`);
      res.status(204);
    }).catch(error => next(error))
  } else {
    res.status(400).send('ID parameter is missing');
  }
});

app.put('/api/persons/:id', (req, res, next) => {
  handleContactUpdate(req, res, next);
})

app.use((req, res) =>{
  res.status(404).send('unknown path');
});

app.use((error, req, res, next)=> {
  if (error.name === 'CastError') {
    res.status(400).send('Invalid Id');
  }
  next(error);
})

app.listen(PORT, () => console.log('App is up and running at port: ', PORT))