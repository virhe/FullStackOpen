const Persons = ({ personsToShow, delPerson }) => {
  return (
    <>
      {personsToShow.map(person => 
        <p key={person.name}>{person.name} {person.number}
        <button onClick={() => delPerson(person.id)}>delete</button></p>
      )}
    </>
  )
}

export default Persons