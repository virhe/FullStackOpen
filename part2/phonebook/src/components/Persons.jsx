const Persons = ({ showPerson }) => {
  return (
    <ul>
      {showPerson.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
    </ul>
  )
}

export default Persons