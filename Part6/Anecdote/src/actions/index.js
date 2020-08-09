import * as services from '../services/anecdoteService'

export const addNewAnecdote = (anecdote) => {
  return async dispatch =>  {
    const newAnecdote = await services.addAnecdote(anecdote)
    return dispatch({type: 'CREATE', payload: newAnecdote})
  }
}

export const voteForAnecdote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await services.voteForAnecdoteService(anecdote)
    return dispatch({type: 'VOTE', payload: updatedAnecdote})
  }
}

export const setNotification = (message, time) => {
  return dispatch => {    
    const timer = setTimeout(() => dispatch({type: 'CLEAR_NOTIFICATION'}), time)
    dispatch({type: 'DISPLAY_NOTIFICATION', payload: {timer, message}})
  }
}

export const updateFilter = (filter) => ({type: 'UPDATE_FILTER', payload: filter})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await services.fetchAllAnecdotes()
    return dispatch({type: 'INITIALIZE_ANECDOTES', payload: anecdotes})
  }
}
