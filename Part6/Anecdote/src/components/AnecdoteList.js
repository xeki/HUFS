import React from 'react'
import {connect} from 'react-redux'
import {voteForAnecdote, setNotification} from '../actions'

const AnecdoteList = (props) => {
  const voteAction = (anecdote) => {
    props.setNotification(`You voted for ' ${anecdote.content} '`, 2000)
    props.voteForAnecdote(anecdote)
  } 
  return (<div>    
    <h2>Anecdotes</h2>
    {props.anecdotes.map(anecdote=> <div className='row-block'>
      <p className='content'>{anecdote.content}</p>
      <p className='vote-count'>has :{anecdote.votes} votes</p>
      <p className='vote-button'><button onClick={() => voteAction(anecdote)}> Vote</button></p>
    </div>)}
  </div>)
}

const mapStateToProps = ({filter, anecdote}) => {
  const anecdotes = anecdote.filter(a => a.content.includes(filter))
  return {
    filter,
    anecdotes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    voteForAnecdote: (anecdote) => dispatch(voteForAnecdote(anecdote)),
    setNotification: (message, timeout) => dispatch(setNotification(message, timeout))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
