import React, { useState } from 'react'

const Display = (props) => props.persons.length ? 
  props.persons.map(person => <p key={person.name}>{`${person.name} ${person.number}`}</p>) : 'No contact to display'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filterText, setFilterText] = useState('');
  const [filteredPersons, setFilteredPersons] = useState([]);

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
      const existedName = persons.filter(person => 
        person.name.toLocaleLowerCase() === newName.toLocaleLowerCase()
      );
      if (existedName.length) {
        alert(`${newName} is already added to phonebook`);
        setNewName('');
        setNewPhone('');
        return;
      }
      const newPersons = [...persons, {name: newName, number: newPhone}];
      setPersons(newPersons);
      setNewName('');
      setNewPhone('');
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
      <Display persons={filterText.trim() ? filteredPersons: persons} />
    </div>
  )
}

export default Phone;