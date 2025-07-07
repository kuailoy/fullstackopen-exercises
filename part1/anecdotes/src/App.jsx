import { useState } from 'react'

const Header = ({ title }) => <h1>{title}</h1>

const AnecdoteDisplay = ({ content, votesCount }) => (
  <>
    {content}
    <br />
    has {votesCount} votes
    <br />
  </>
)

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ]

  const initialVotes = Array(anecdotes.length).fill(0)

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(initialVotes)

  const next = () => {
    const intNumber = Math.floor(Math.random() * anecdotes.length)
    console.log('Random selected: ', intNumber)
    setSelected(intNumber)
  }

  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    console.log('votes: ', newVotes)
    setVotes(newVotes)
  }

  const mostVotesIndex = votes.indexOf(Math.max(...votes))
  console.log('mostVotesIndex: ', mostVotesIndex);

  return (
    <div>
      <Header title="Anecdote of the day" />
      <AnecdoteDisplay content={anecdotes[selected]} votesCount={votes[selected]} />
      <Button text="vote" onClick={handleVote} />
      <Button text="next anecdotes" onClick={next} />
      <Header title="Anecdote with most votes" />
      <AnecdoteDisplay content={anecdotes[mostVotesIndex]} votesCount={votes[mostVotesIndex]} />
    </div>
  )
}

export default App
