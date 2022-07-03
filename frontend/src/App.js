import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Form from './components/Form'
import Filter from './components/Filter'
import getPersons from './services/getPersons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [errorMsg, setErrorMsg] = useState(null)

  const Infomessage = ({ message }) => {
    if (message === null) {
      return null
    }
    if (message.includes("Changed") || message.includes("Added") || message.includes("Deleted")) {
      return (
        <p className='popup'>
          {message}
        </p>
      )
    }
    else {
      return (
        <div>
          <p className='deleteError'>{message}</p>
        </div>
      )
    }
  }

  useEffect(() => {
    getPersons
      .getAll()
      .then(axiosResponse => {
        setPersons(axiosResponse.data)
      })
  }, [])


  const submitInfo = (event) => {
    event.preventDefault()
    const infoObject = {
      name: newName,
      number: newNumber,
    }

    if (persons.find(({ name }) => name.toLowerCase() === infoObject.name.toLowerCase())) {
      // PUT, case sensitive (doesnt ignore spaces)
      let findRightId = persons.filter(person => person.name === infoObject.name)
      let rightId = findRightId[0].id
      console.log(persons.map(person => person.id))
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        getPersons
          .update(rightId, infoObject)
          .then(response => {
            setPersons(persons.map(person => person.id !== rightId ? person : response))
            setErrorMsg(`Changed ${infoObject.name}`)
            setTimeout(() => {
              setErrorMsg(null)
            }, 4000)
          })
          .catch(error => {
            setErrorMsg(`${error.response.data.error}`)
            setTimeout(() => {
              setErrorMsg(null)
            }, 4000)
          })
      }
    }
    else {
      // POST
      getPersons
        .createPerson(infoObject)
        .then(response => {
          setPersons([...persons, response.data])
          setErrorMsg(`Added ${infoObject.name}`)
          setTimeout(() => {
            setErrorMsg(null)
          }, 4000)
          })
          .catch(error => {
            console.log("tassa",error.response.data)
            setErrorMsg(`${error.response.data.error}`)
            setTimeout(() => {
              setErrorMsg(null)
            }, 4000)
      })
    }
    setNewName("")
    setNewNumber("")
  }

  const deletePerson = event => {
    // DELETE 
    if (window.confirm(`Delete user? `)) {
      getPersons
        .deletePerson(event.target.value)
        .then(() => {
          setErrorMsg(`Deleted user`)
          setTimeout(() => {
            setErrorMsg(null)
          }, 3000)
        })
    }
  }

  const nameChange = (event) => {
    setNewName(event.target.value)
  }

  const numberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const filterChange = (event) => setFilter(event.target.value)

  const personsFiltered = persons.filter(person => person.name.includes(filter))

  return (
    <div>
      <Infomessage message={errorMsg} />
      <h2>Phonebook</h2>
      <Filter filter={filter} filterChange={filterChange} />

      <h2>Add a new</h2>
      <Form
        submitInfo={submitInfo}
        newName={newName}
        nameChange={nameChange}
        newNumber={newNumber}
        numberChange={numberChange}
      />

      <h2>Numbers</h2>
      <Persons persons={personsFiltered} deletePerson={deletePerson} />
    </div>
  )
}

export default App