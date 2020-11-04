import * as types from '../types'
import _ from 'lodash'

const initialState = { notes: [], persons: [], authToken: null, errorMessage: null }

export const reducer = (state=initialState, {type, payload}) => {
  switch (type) {
    case types.PERSON_LOGIN:
      return {...state, authToken: payload, errorMessage: null}
    case types.FETCH_ALL_RECORDS:
      return payload.recordType === types.NOTES_RECORD ?
      ({...state, notes: _.mapKeys(payload.data, 'id'), errorMessage: null}) :
      ({...state, persons: _.mapKeys(payload.data, 'id'), errorMessage: null})
    case types.FETCH_RECORD:
      return payload.recordType === types.NOTES_RECORD ?
      ({ ...state, note: payload.data , errorMessage: null}) :
      ({...state, person: payload.data, errorMessage: null})
    case types.CREATE_RECORD:
      return payload.recordType === types.NOTES_RECORD ?
      ({ ...state, notes: {...state.notes, [payload.data.id]: payload.data}, errorMessage: null }) :
      ({ ...state, persons: {...state.persons, [payload.data.id]: payload.data}, errorMessage: null})
    case types.UPDATE_RECORD:
      return payload.recordType === types.NOTES_RECORD ?
      ({ ...state, notes: { ...state.notes, [payload.data.id]: payload.data }, errorMessage: null }) :
      ({ ...state, persons: {...state.persons, [payload.data.id]: payload.data}, errorMessage: null})
    case types.DELETE_RECORD: 
      return payload.recordType === types.NOTES_RECORD ?
      ({ ...state, notes: _.omit(state.notes, payload.data.id), errorMessage: null }) :
      ({ ...state, persons: _.omit(state.notes, payload.data.id), errorMessage: null})
    case types.OPERATION_ERROR:
      return {...state, errorMessage: 'Error has occurred'}
    default:
      return state;
  }
}
