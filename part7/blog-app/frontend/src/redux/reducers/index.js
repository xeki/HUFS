import {authReducer} from './authReducer'
import {notesReducer} from './notesReducer'
import {personsReducer} from './personsReducer'
import {operationReducer} from './operationReducer'
import notificationReducer from './notificationReducer'
import {combineReducers} from 'redux'

const reducer = combineReducers({
  auth: authReducer,
  notes: notesReducer,
  persons: personsReducer,
  operation: operationReducer,
  notification: notificationReducer
})

export default reducer
