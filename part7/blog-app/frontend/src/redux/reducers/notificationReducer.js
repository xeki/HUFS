import * as types from '../types'

const initState = {message: null}

const notificationReducer = (state=initState, {payload, type}) => {
  switch(type) {
    case types.SET_NOTIFICATION_MESSAGE:
      return {message: payload}
    case types.CLEAR_NOTIFICATION_MESSAGE:
      return {message: null}
    default:
      return state
  }
}

export default notificationReducer
