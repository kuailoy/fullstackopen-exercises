import { useState, useEffect } from 'react'
import personService from './service/persons'

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

const Persons = ({ persons, filterText, handelDelete }) => {
  const upperCasedText = filterText.toUpperCase()
  const filteredPersons = persons.filter(({ name }) => name.toUpperCase().includes(upperCasedText))

  return (
    <div>
      {filteredPersons.map(({ name, number, id }) => (
        <p key={id}>
          {name} {number} <button onClick={() => handelDelete({ name, id })}>delete</button>
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

  const handleFilterTextChange = event => {
    setFilterText(event.target.value)
  }

  const handleNameChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

  const handelDelete = ({ name, id }) => {
    const confirmed = window.confirm(`Delete ${name} ?`)
    if (confirmed) {
      personService.deleteOne(id).then(response => {
        const newPersons = persons.filter(({ id }) => id !== response.id)
        setPersons(newPersons)
      })
    }
  }

  const clearInputs = () => {
    setNewName('')
    setNewNumber('')
  }
  const handleSubmit = event => {
    event.preventDefault()

    const existingPerson = persons.find(person => person.name === newName)
    console.log('isNameExists: ', existingPerson)

    if (existingPerson) {
      // update a existing person's number
      const changedPerson = { ...existingPerson, number: newNumber }
      const { id, name } = changedPerson
      const confirmed = window.confirm(`${name} is already added to phonebook, replace the old number with a new one?`)
      if (confirmed) {
        personService.update(id, changedPerson).then(updatedPerson => {
          setPersons(persons.map(person => (updatedPerson.id === person.id ? updatedPerson : person)))
          clearInputs()
        })
      }
    } else {
      // create a new person
      const newPerson = {
        name: newName,
        number: newNumber,
      }
      personService.create(newPerson).then(createdPerson => {
        setPersons(persons.concat(createdPerson))
        clearInputs()
      })
    }
  }

  // Data fetching
  useEffect(() => {
    personService.getAll().then(allPersons => {
      setPersons(allPersons)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter text={filterText} onChange={handleFilterTextChange} />
      <h3>Add a new</h3>
      <PersonForm onSubmit={handleSubmit} newName={newName} newNumber={newNumber} onNameChange={handleNameChange} onNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons filterText={filterText} persons={persons} handelDelete={handelDelete} />
    </div>
  )
}

export default App
