import services from '../../services/blogs'
import * as types from '../types'

const getAllNotes = () => async dispatch => {
  dispatch({ type: types.OPERATION_WAITING })
  try {
    const data = await services.getAll()
    dispatch({ type: types.OPERATION_SUCCESS})
    return dispatch({ type: types.FETCH_ALL_NOTES, payload: data })
  } catch (e) {
    console.error('Error: ', e)
    dispatch({ type: types.SET_NOTIFICATION_MESSAGE, payload: 'FAILED TO FETCH NOTES, PLEASE TRY AGAIN' })
    setTimeout(() => dispatch({ type: types.CLEAR_NOTIFICATION_MESSAGE }), 1500)
    dispatch({ type: types.OPERATION_ERROR })
  }
}

// const getNote = (id, baseUrl) => async dispatch => {
//   const data = await services.getNote(id, baseUrl)
//   return dispatch({ type: types.FETCH_NOTES, payload: { data } })
// }

const addNote = ({ title, author, token, url }) => async dispatch => {
  dispatch({ type: types.OPERATION_WAITING })
  try {
    const data = await services.addBlog({ title, author, token, url })
    dispatch({ type: types.OPERATION_SUCCESS })
    return dispatch({ type: types.CREATE_NOTES, payload: data })
  } catch (e) {
    console.error('Error: ', e)
    dispatch({ type: types.SET_NOTIFICATION_MESSAGE, payload: 'FAILED TO ADD NOTE, PLEASE TRY AGAIN' })
    setTimeout(() => dispatch({ type: types.CLEAR_NOTIFICATION_MESSAGE }), 1500)
    dispatch({ type: types.OPERATION_ERROR })

  }
}

const updateNote = ({ id, title, author, url, likes }, token) => async dispatch => {
  dispatch({ type: types.OPERATION_WAITING })
  try {
    const data = await services.updateBlog({ id, title, author, url, likes }, token)
    dispatch({ type: types.OPERATION_SUCCESS })
    return dispatch({ type: types.UPDATE_NOTES, payload: data })
  } catch (e) {
    console.error('Error: ', e)
    dispatch({ type: types.SET_NOTIFICATION_MESSAGE, payload: 'FAILED TO UPDATE NOTE, PLEASE TRY AGAIN' })
    setTimeout(() => dispatch({ type: types.CLEAR_NOTIFICATION_MESSAGE }), 1500)
    dispatch({ type: types.OPERATION_ERROR })
  }
}

const deleteNote = (id, token) => async dispatch => {
  dispatch({ type: types.OPERATION_WAITING })
  try {
    await services.deleteBlog(id, token)
    dispatch({ type: types.DELETE_NOTES, payload: { id } })
    return dispatch({ type: types.OPERATION_SUCCESS })
  } catch (e) {
    console.error('Error: ', e)
    dispatch({ type: types.SET_NOTIFICATION_MESSAGE, payload: 'FAILED TO DELETE NOTE, PLEASE TRY AGAIN' })
    setTimeout(() => dispatch({ type: types.CLEAR_NOTIFICATION_MESSAGE }), 1500)
    dispatch({ type: types.OPERATION_ERROR })
  }
}

const addComment = (id, comment) => async dispatch => {
  try {
    const data = await services.addComment(id, comment)    
    return dispatch({ type: types.UPDATE_NOTES, payload: data })
  } catch (e) {
    dispatch({ type: types.SET_NOTIFICATION_MESSAGE, payload: 'FAILED TO ADD COMMENT, PLEASE TRY AGAIN' })
    setTimeout(() => dispatch({ type: types.CLEAR_NOTIFICATION_MESSAGE }), 1500)
    console.log('Error when trying to add a comment: ', e)
  }
}

export {
  getAllNotes,
  addNote,
  updateNote,
  deleteNote,
  addComment
}
