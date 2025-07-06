import { useState } from 'react'

const Header = ({ title }) => <h1>{title}</h1>

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ name, value }) => (
  <tr>
    <td>{name}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const average = (good * 1 + bad * -1) / total
  const positive = (good / total) * 100 + ' %'

  if (total === 0) {
    return <div>No feedback given</div>
  }

  return (
    <table>
      <tbody>
        <StatisticLine name="good" value={good} />
        <StatisticLine name="neutral" value={neutral} />
        <StatisticLine name="bad" value={bad} />
        <StatisticLine name="total" value={total} />
        <StatisticLine name="average" value={average} />
        <StatisticLine name="positive" value={positive} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const plusGood = () => setGood(good + 1)
  const plusNeutral = () => setNeutral(neutral + 1)
  const plusBad = () => setBad(bad + 1)

  return (
    <div>
      <Header title="give feedback" />
      <Button text="good" onClick={plusGood} />
      <Button text="neutral" onClick={plusNeutral} />
      <Button text="bad" onClick={plusBad} />
      <Header title="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
