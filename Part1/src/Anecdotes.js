import React, { useState } from 'react'

export const Anecdote = (props) => {
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState({0: 1})
  const registerVote = () => {
    const newVote = { ...vote, [selected]: (vote[selected] || 0) + 1 }
    setVote(newVote)
  }

  const selectRandom = () => {
    let random = parseInt(Math.random()*props.anecdotes.length, 10)
    random = random === selected ? (random + 1) % (props.anecdotes.length) : random;
    console.log('Random: ', random);
    setSelected(random)
  }

  const getMostVotedIndex = () => {
    let mostVoted = null;
    for(const key of Object.keys(vote)) {
      if (mostVoted === null || vote[key] > vote[mostVoted]) {
        mostVoted = key;
      }
    }
    return mostVoted;
  }
  return (
    <div>
      <h2> Anocdote of the day</h2>
      <p>{props.anecdotes[selected]}</p>
      <button onClick={() => selectRandom()}>Anecdote</button>
      <p> has {vote[selected] || 0} vote(s) </p>
      <button onClick={() => registerVote()}>Vote</button>
      <h2> Most voted Anocdote </h2>
      <p>{props.anecdotes[getMostVotedIndex()]}</p>
      <p> has {vote[getMostVotedIndex()] || 0} vote(s) </p>
    </div>
  )
}

export const anecdotesList = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
