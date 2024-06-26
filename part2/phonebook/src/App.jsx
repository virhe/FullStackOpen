import { useEffect, useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import noteService from './services/notes'
import Notification from './components/Notification'

import './App.css'


const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [status, setStatus] = useState(true)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.map(person => person.name).includes(newName)) {
      const target = persons.find(person => person.name === newName)
      const changedPerson = { ...target, number: newNumber }

      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        noteService
          .update(target.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== target.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
      }
      return
    }

    noteService
      .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')

          setMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
  }

  const delPerson = (id) => {
    const target = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${target.name}?`)) {
      noteService
        .del(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          setStatus(false)
          setMessage(`Information of ${target.name} has already been removed from server`)
          setTimeout(() => {
            setMessage(null)
            setStatus(true)
          }, 5000)
        }
        )
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const showPerson = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} status={status} />

      <Filter handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
  
      <h3>Numbers</h3>

      <Persons showPerson={showPerson} delPerson={delPerson} />
    </div>
  )
}

export default App