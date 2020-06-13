import React, { useState, useEffect } from 'react'
import * as personAPI from './Services/personAPI'

const URL = 'http://localhost:3001/persons';

const deletePerson = (person, persons, setPersons) => {
  const question = `Delete ${person.name}?`;
  const ans = window.confirm(question);
  if (ans) {
    personAPI.deletePerson(URL, person.id)
      .then(()=>{
        const newPersons = persons.filter(p => p.id !== person.id)
        setPersons(newPersons);
      })
  }
}

const addPerson = (person, persons, setPersons) => {
  personAPI.addPerson(URL, person)
  .then((newPerson) => {
    setPersons([...persons, newPerson]);
  })
}

const updatePerson = (person, persons, setPersons) => {
  personAPI.updatePerson(URL, person.id, person)
  .then(() => {
    const newPersons = persons.map(p => p.name === person.name ? {...p, ...person} : p);
    setPersons(newPersons);
  })
}

const Display = (props) => props.persons.length ?
  props.persons.map(person => <p key={person.name}>
    {`${person.name} ${person.number}`} &nbsp;&nbsp;
    <button key={`id-${person.name}`} onClick={() => deletePerson(person, props.persons, props.setPersons)}>
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
          updatePerson({ ...existedPerson[0], ...newPerson}, persons, setPersons);
          setNewName('');
          setNewPhone('');
        } 
      } else {
        addPerson(newPerson, persons, setPersons);
        setNewName('');
        setNewPhone('');
      }
    }
  }

  return (
    <div>
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
      <Display persons={filterText.trim() ? filteredPersons : persons} setPersons={setPersons} />
    </div>
  )
}

export default Phone;