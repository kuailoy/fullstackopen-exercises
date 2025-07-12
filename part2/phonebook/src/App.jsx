import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ text, onChange }) => (
  <div>
    filter shown with: <input value={text} onChange={onChange} />
  </div>
)

const PersonForm = ({ onSubmit, newName, newNumber, onNameChange, onNumberChange }) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input value={newName} onChange={onNameChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={onNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Persons = ({ persons, filterText }) => {
  const upperCasedText = filterText.toUpperCase()
  const filteredPersons = persons.filter(({ name }) => name.toUpperCase().includes(upperCasedText))

  return (
    <div>
      {filteredPersons.map(({ name, number, id }) => (
        <p key={id}>
          {name} {number}
        </p>
      ))}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [filterText, setFilterText] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleFilterTextChange = (event) => {
    setFilterText(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const isNameExists = persons.some((person) => person.name === newName)
    console.log('isNameExists: ', isNameExists)

    if (isNameExists) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  // Data fetching
  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter text={filterText} onChange={handleFilterTextChange} />
      <h3>Add a new</h3>
      <PersonForm onSubmit={handleSubmit} newName={newName} newNumber={newNumber} onNameChange={handleNameChange} onNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons filterText={filterText} persons={persons} />
    </div>
  )
}

export default App
