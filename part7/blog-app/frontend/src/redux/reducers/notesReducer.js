import * as types from '../types'
import _ from 'lodash'

const initialState = { notes: [], note: null, notesStat: [], errorMessage: null }

export const notesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FETCH_ALL_NOTES:
      return ({ ...state, notes: _.mapKeys(payload.blogs, 'id'), notesStat: payload.blogStat, errorMessage: null }) 
    case types.FETCH_NOTES:
      return ({ ...state, note: payload, errorMessage: null })
    case types.CREATE_NOTES:
      return ({ ...state, notes: { ...state.notes, [payload.id]: payload }, errorMessage: null }) 
    case types.UPDATE_NOTES:
      return ({ ...state, notes: { ...state.notes, [payload.id]: {...state.notes[payload.id], ...payload, user: state.notes[payload.id].user }}, errorMessage: null }) 
    case types.DELETE_NOTES:
      return ({ ...state, notes: _.omit(state.notes, payload.id), errorMessage: null })
    case types.NOTES_OP_ERROR:
      return { ...state, errorMessage: 'Error has occurred' }
    default:
      return state;
  }
}
