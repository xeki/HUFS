import * as actionTypes from '../types'

const initialState= {status: 'init'}

export const operationReducer = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.OPERATION_WAITING:
      return {...state, status: 'waiting'} 
    case actionTypes.OPERATION_SUCCESS:
      return { ...state, status: 'success' } 
    case actionTypes.OPERATION_ERROR:
      return { ...state, status: 'error' }   
    default:
      return state;
  }
}
