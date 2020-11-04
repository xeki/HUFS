import services from '../../services/persons'
import * as types from '../types'

const getPersonById = (id) => async dispatch => {
  dispatch({type: types.OPERATION_WAITING})
  try {
    const data = await services.getPersonById(id)
    dispatch({ type: types.OPERATION_SUCCESS })
    return dispatch({ type: types.FETCH_PERSON_BY_ID, payload: data })
  } catch (e) {
    console.error(e)
    dispatch({ type: types.SET_NOTIFICATION_MESSAGE, payload: 'FAILED TO FETCH USER, PLEASE TRY AGAIN' })
    setTimeout(() => dispatch({ type: types.CLEAR_NOTIFICATION_MESSAGE }), 1500)
    dispatch({ type: types.OPERATION_ERROR })
  }
}

const getAllPersons = () => async dispatch => {
  try {
    const data = await services.getAll()
    return dispatch({ type: types.FETCH_ALL_PERSONS, payload: { data } })
  } catch (e) {
    dispatch({ type: types.SET_NOTIFICATION_MESSAGE, payload: 'FAILED TO FETCH USERS, PLEASE TRY AGAIN' })
    setTimeout(() => dispatch({ type: types.CLEAR_NOTIFICATION_MESSAGE }), 1500)
    console.log('Error get persons: ', e)
  }
}

const getPerson = (id, baseUrl) => async dispatch => {
  try {
    const data = await services.getPerson(id, baseUrl)
    return dispatch({ type: types.FETCH_PERSONS, payload: { data } })
  } catch (e) {
    dispatch({ type: types.SET_NOTIFICATION_MESSAGE, payload: 'FAILED TO FETCH USER, PLEASE TRY AGAIN' })
    setTimeout(() => dispatch({ type: types.CLEAR_NOTIFICATION_MESSAGE }), 1500)
    console.log('Error get person: ', e)
  }
}

const createPerson = (record) => async dispatch => {
  dispatch({type: types.OPERATION_WAITING})
  try {
    const data = await services.createNewPerson(record)
    dispatch({ type: types.OPERATION_SUCCESS })
    return dispatch({ type: types.CREATE_PERSONS, payload: { data } })
  } catch (e) {
    dispatch({ type: types.SET_NOTIFICATION_MESSAGE, payload: 'FAILED TO CREATE A USER, PLEASE TRY AGAIN' })
    setTimeout(() => dispatch({ type: types.CLEAR_NOTIFICATION_MESSAGE }), 1500)
    dispatch({ type: types.OPERATION_ERROR })
  }
}

const updatePerson = (id, record, baseUrl) => async dispatch => {
  try {
    const data = await services.updateRecord(id, record, baseUrl)
    return dispatch({ type: types.UPDATE_PERSONS, payload: { data } })
  } catch (e) {
    dispatch({ type: types.SET_NOTIFICATION_MESSAGE, payload: 'FAILED TO UPDATE A USER, PLEASE TRY AGAIN' })
    setTimeout(() => dispatch({ type: types.CLEAR_NOTIFICATION_MESSAGE }), 1500)
    console.log('Error update person: ', e)
  }
}

const deletePerson = (id, baseUrl) => async dispatch => {
  try {
    await services.deleteRecord(id, baseUrl)
    return dispatch({ type: types.DELETE_PERSONS, payload: { data: { id } } })
  } catch (e) {
    dispatch({ type: types.SET_NOTIFICATION_MESSAGE, payload: 'FAILED TO DELETE A USER, PLEASE TRY AGAIN' })
    setTimeout(() => dispatch({ type: types.CLEAR_NOTIFICATION_MESSAGE }), 1500)
    console.log('Delete person error: ', e)
  }
}

export default {
  getPersonById,
  getAllPersons,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson,
}
