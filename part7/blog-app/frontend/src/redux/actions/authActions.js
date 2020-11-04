import services from '../../services/userAccess'
import * as types from '../types'

const loginPerson = (userName, password) => async dispatch => {
  dispatch({type: types.OPERATION_WAITING})
  const data = await services.authenticate({userName, password})
  if (data) {
    dispatch({ type: types.OPERATION_SUCCESS })
    return dispatch({ type: types.USER_LOGIN, payload: data })
  }
  dispatch({type: types.SET_NOTIFICATION_MESSAGE, payload: 'FAILED TO LOGIN USER, PLEASE TRY AGAIN'})
  setTimeout(() => dispatch({type: types.CLEAR_NOTIFICATION_MESSAGE}),1500)
  return dispatch({ type: types.OPERATION_ERROR })
}

const logOutPerson = () => async dispatch => {
  return dispatch({ type: types.USER_LOGGED_OUT})
}

const updateStoreFromLocalStorage = (authToken, userName) => dispatch => {
  return dispatch({type: types.USER_LOGIN, payload: {authToken, userName}})
}

export { loginPerson, logOutPerson, updateStoreFromLocalStorage}
