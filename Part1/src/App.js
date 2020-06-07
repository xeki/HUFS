import React, { useState } from 'react';
import {Feedback} from './feedback'
import {anecdotesList, Anecdote} from './Anecdotes'
function App(props) {
  const [value, setValue] = useState(0)

  const updateState = (val) => () => {
    setValue(val)
  }

  return (
    <div>
      <p> {value} </p>
      <button onClick={updateState(value + 1)}> Increment </button>
      <Feedback />
      <Anecdote anecdotes={anecdotesList} />
    </div>
  )
}

export default App;
