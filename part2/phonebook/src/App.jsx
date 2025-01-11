import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Message from './components/Message'
import personService from './services/persons'

import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [showAll, setShowAll] = useState('')

  const [successMessage, setSuccessMessage] = useState(null)
  const [failureMEssage, setFailureMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (e) => {
    e.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const person = persons.find(person => person.name === newName)

    if (person) {
      alert(`"${newName} is already added to phonebook`)

      if (window.confirm(`${person.name} is already added to phonebook, replace the old number
        with the new one?`)) {
          personService
            .update(person.id, personObject)
            .then(updatedPerson => {
              setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson))
            })

          setSuccessMessage(`Updated ${person.name}'s number`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        }

      setNewName('')
      setNewNumber('')
    }

    else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })

      setSuccessMessage(`Added ${personObject.name}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)

      setNewName('')
      setNewNumber('')
    }
  }

  const delPerson = id => {
    const personObject = persons.find(person => person.id === id)

    if (window.confirm(`Delete ${personObject.name}?`)) {
      personService
        .del(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          console.log(`Information of ${personObject.name} has already been removed from server`)
        })
    }
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleSearchChange = (e) => {
    setSearchName(e.target.value)
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={successMessage} type="success"/>
      <Message message={failureMessage}/>
      <Filter searchName={searchName} handleSearchChange={handleSearchChange}/>

      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
       newNumber={newNumber} handleNumberChange={handleNumberChange}/>

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} delPerson={delPerson}/>
    </div>
  )
}

export default App