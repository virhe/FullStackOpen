const Filter = ({ searchName, handleSearchChange }) => {
  return (
    <p>filter shown with <input value={searchName} onChange={handleSearchChange}></input></p>
  )
}

export default Filter