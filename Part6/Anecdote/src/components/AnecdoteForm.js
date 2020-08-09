import React from 'react'
import {connect} from 'react-redux'
import Notification from './Notification'
import {addNewAnecdote, setNotification} from '../actions'

const AddAnecdote = (props) => {
  const createNewAnecodte = (e) => {
    e.preventDefault()
    const anecdote = e.target.anecdote.value
    props.setNotification(`New anecdote ' ${anecdote} ' added `, 2000)
    props.addNewAnecdote(anecdote)
    e.target.anecdote.value = ''
  }

  return (<div>
    <form onSubmit={createNewAnecodte}>
      <input type='text' name='anecdote' placeholder='new anecdote' />
      <button type='submit'>Add</button>
    </form>
    <Notification />
    </div>)
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewAnecdote: (anecdote) => dispatch(addNewAnecdote(anecdote)), 
    setNotification: (message, timeout) => dispatch(setNotification(message, timeout))
  }
}

export default connect(null, mapDispatchToProps)(AddAnecdote)
