import {createStore, applyMiddleware, compose} from 'redux'
import reducer from '../reducers'
import thunk from 'redux-thunk'

const composeEnhaners = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// const devTool = window.__REDUX_DEVTOOLS_EXTENSION__ &&  window.__REDUX_DEVTOOLS_EXTENSION__()
export const store = createStore(reducer, composeEnhaners(applyMiddleware(thunk)))
  