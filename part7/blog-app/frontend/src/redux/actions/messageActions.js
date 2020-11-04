import * as types from '../types'

export const setNotificationMessage = (message) => {
  return ({payload: message, type: types.SET_NOTIFICATION_MESSAGE})
}

export const clearNotificationMessage = () => {
  return ({type: types.CLEAR_NOTIFICATION_MESSAGE})
}
