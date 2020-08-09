import notification from './notificationReducer'
import anecdote from './anecdoteReducer'
import filter from './filterReducer'
import {combineReducers} from 'redux'

const reducer = combineReducers({notification, anecdote, filter})

export default reducer
