import { useState } from 'react'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad}) => {
  const all = good + neutral + bad
  const avg = (good - bad) / all
  const positive = (good / all) * 100

  if (all === 0) {
    return <p>No feedback given</p>
  }

  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={avg} />
          <StatisticLine text="positive" value={positive + "%"} />
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToValue = (answer, value) => {
    if (answer === 'good') {
      setGood(value)
    } else if (answer === 'neutral') {
      setNeutral(value)
    } else if (answer === 'bad') {
      setBad(value)
    }
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setToValue('good', good + 1)} text="good" />
      <Button onClick={() => setToValue('neutral', neutral + 1)} text="neutral" />
      <Button onClick={() => setToValue('bad', bad + 1)} text="bad" />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App