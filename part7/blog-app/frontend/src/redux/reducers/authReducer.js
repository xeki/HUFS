import * as types from '../types'

const initialState = {
  authToken: null,
  user: null,
  errorMessage: null
}

export const authReducer = (state=initialState, {type, payload}) => {
  switch (type) {
    case types.USER_LOGIN:
      return { ...state, authToken: payload.authToken, user: payload.user, errorMessage: null }
    case types.USER_LOGGED_OUT:
      return { ...state, authToken: null, user: null, errorMessage: null}
    case types.USER_OP_ERROR:  
      return {...state, errorMessage: payload};  
    default:
      return state;
  }
}
