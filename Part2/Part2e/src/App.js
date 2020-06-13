import React, { useState, useEffect } from 'react'
import * as personAPI from './Services/personAPI'
import './Styles.css'

const URL = 'http://localhost:3001/persons';

const displayMessage = (props) => {
  const {error, messageText} = props;
  console.log('Message text: ', props)
  const className = error ? 'error message' : 'success message';
  const messageDiv = document.createElement('div');
  messageDiv.innerHTML = `<div class=${className}>
    ${messageText}
  </div>`;
  document.querySelector('#message').appendChild(messageDiv);
  setTimeout(() => { console.log('Timeout')
    // setMessage({error: null, messageText: '', show: false});
    document.querySelector('#message').removeChild(messageDiv);
  }, 4000);
}

const deletePerson = (person, persons, setPersons, setMessage) => {
  const question = `Delete ${person.name}?`;
  const ans = window.confirm(question);
  if (ans) {
    personAPI.deletePerson(URL, person.id)
      .then(() => {
        const newPersons = persons.filter(p => p.id !== person.id);
        setPersons(newPersons);
        setMessage({ error: false, messageText: `${person.name} information deleted successfully `, show: true});
        displayMessage({ error: false, messageText: `${person.name} information deleted successfully `})
      })
      .catch(() => {
        setMessage({ error: true, messageText: `Information of ${person.name} has already been removed`, show: true})
        displayMessage({ error: true, messageText: `Information of ${person.name} has already been removed`});
      })
  }
}

const addPerson = (person, persons, setPersons, setMessage) => {
  personAPI.addPerson(URL, person)
    .then((newPerson) => {
      setPersons([...persons, newPerson]);
      setMessage({ error: false, messageText: `${person.name} added successfully`, show: true});
      displayMessage({ error: false, messageText: `${person.name} added successfully`})
    })
    .catch(() => {
      setMessage({ error: true, messageText: `Error adding ${person.name}`, show: true});
      displayMessage({ error: true, messageText: `Error adding ${person.name}`, show: true});
    })
}

const updatePerson = (person, persons, setPersons, setMessage) => {
  personAPI.updatePerson(URL, person.id, person)
    .then(() => {
      const newPersons = persons.map(p => p.name === person.name ? { ...p, ...person } : p);
      setPersons(newPersons);
      setMessage({ error: false, messageText: `${person.name} updated successfully`, show: true});
      displayMessage({ error: false, messageText: `${person.name} updated successfully`});
    })
    .catch(() => {
      setMessage({ error: true, messageText: `Error updating ${person.name}`, show: true});
      displayMessage({ error: true, messageText: `Error updating ${person.name}`});
    })
}

const Display = (props) => props.persons.length ?
  props.persons.map(person => <p key={person.name}>
    {`${person.name} ${person.number}`} &nbsp;&nbsp;
    <button key={`id-${person.name}`} onClick={() => deletePerson(person, props.persons, props.setPersons, props.setMessage)}>
      Delete
    </button>
  </p>) : 'No contact to display'

const Filter = (props) => <div>filter by name: <input type="text" name="filter_name" value={props.filterText} onChange={props.filterPersons} /></div>

const AddPerson = (props) => (
  <form>
    <h2>Add new</h2>
    <div>
      <div>name: <input name="name" value={props.newName} onChange={props.handleNameChange} /></div>
      <div>number: <input name="number" value={props.newPhone} onChange={props.handlePhoneChange} /></div>
    </div>
    <div>
      <button type="submit" onClick={props.addPersons}>add</button>
    </div>
  </form>);

const Phone = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filterText, setFilterText] = useState('');
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [message, setMessage] = useState({error: null, messageText: '', show: false});

  useEffect(() => {
    personAPI.getPersons(URL)
      .then(persons => setPersons(persons))
      .catch(() => setPersons([]))
  }, []);

  const filterPersons = (e) => {
    e.preventDefault();
    setFilterText(e.target.value);
    const newFileredPersons = persons.filter(person =>
      person.name.toLocaleLowerCase().includes(e.target.value.trim().toLocaleLowerCase())
    );
    setFilteredPersons(newFileredPersons);
  }

  const handlePhoneChange = (e) => {
    e.preventDefault();
    setNewPhone(e.target.value);
  }

  const handleNameChange = (e) => {
    e.preventDefault();
    setNewName(e.target.value);
  }

  const addPersons = (e) => {
    e.preventDefault();
    if (newName && newPhone) {
      const newPerson = { name: newName, number: newPhone }
      const existedPerson = persons.filter(person =>
        person.name.toLocaleLowerCase() === newName.toLocaleLowerCase()
      );
      if (existedPerson.length) {
        const ans = window.confirm(`${newName} already exists do you want
         to replace the old number with the new one?`);
        if (ans) {
          updatePerson({ ...existedPerson[0], ...newPerson }, persons, setPersons, setMessage);
          setNewName('');
          setNewPhone('');
        }
      } else {
        addPerson(newPerson, persons, setPersons, setMessage);
        setNewName('');
        setNewPhone('');
      }
    }
  }

  return (
    <div>
      <div id='message'>
        {/* {message.show && <Message error={message.error}  message={message.messageText} setMessage={setMessage} />} */}
      </div>
      <h2>Phonebook</h2>
      <Filter filterText={filterText} filterPersons={filterPersons} />
      <AddPerson
        newName={newName}
        newPhone={newPhone}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        addPersons={addPersons}
      />
      <h2>Numbers</h2>
      <Display persons={filterText.trim() ? filteredPersons : persons} setPersons={setPersons} setMessage={setMessage} />
    </div>
  )
}

export default Phone;