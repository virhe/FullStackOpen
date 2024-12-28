const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        <p>name: <input value={newName} onChange={handleNameChange}/></p>
        <p>number: <input value={newNumber} onChange={handleNumberChange}/></p>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm