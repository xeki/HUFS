import React, {useState} from 'react'

export const Feedback = (props) => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  return (
    <div>
      <h2> Feedback </h2>
        <div>
          <button onClick={() => setGood(good+1)}> Good </button>
          <button onClick={() => setNeutral(neutral + 1)}> Neutral </button>
          <button onClick={() => setBad(bad + 1)}> Bad </button>
        </div>
        <div>
          <h2> Statistics </h2>
          <p>Good: {good}</p>
          <p>Neutral: {neutral}</p>
          <p>Bad: {bad}</p>
          <p>Average: {good - bad}</p>
        <p> Percentage: {(good + neutral + bad) !==0 ? good*100/(good + neutral + bad) : 0}%</p>
        </div>
     </div>
  )
}