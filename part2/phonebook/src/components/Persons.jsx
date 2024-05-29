const Persons = ({ showPerson, delPerson }) => {
  return (
    <ul>
      {showPerson.map(person => <li key={person.name}>
        {person.name} {person.number}
        <button onClick={() => delPerson(person.id)}>delete</button>
        </li>)
      }
    </ul>
  )
}

export default Persons