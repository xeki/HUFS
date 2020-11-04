import * as types from '../types'
import _ from 'lodash'

const initialState = { persons: [], person: {blogs: []}, errorMessage: null }

export const personsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FETCH_ALL_PERSONS:
      return ({ ...state, persons: _.mapKeys(payload.data, 'id'), errorMessage: null })
    case types.FETCH_PERSON_BY_ID:
      return ({ ...state, person: payload.user})
    case types.FETCH_PERSONS:
      return ({ ...state, person: payload.data, errorMessage: null })
    case types.CREATE_PERSONS:
      return ({ ...state, persons: { ...state.persons, [payload.data.id]: payload.data }, errorMessage: null })
    case types.UPDATE_PERSONS:
      return ({ ...state, persons: { ...state.persons, [payload.data.id]: payload.data }, errorMessage: null })
    case types.DELETE_PERSONS:
      return ({ ...state, persons: _.omit(state.notes, payload.data.id), errorMessage: null })
    case types.OPERATION_ERROR:
      return { ...state, errorMessage: 'Error has occurred' }
    default:
      return state;
  }
}
