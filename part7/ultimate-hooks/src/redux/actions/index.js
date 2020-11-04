import * as services from '../../services'
import * as types from '../types'
// import {useDispatch, useSelector} from 'react-redux'


// const actions = () => {
//   const dispatch = useDispatch()
//   const notes = useSelector((state)=>state.notes)

const getAllRecords =  (baseUrl, recordType) => async dispatch =>  {
  console.log('Did you call me')
  const data = await services.fetchAll(baseUrl)
  return dispatch({type: types.FETCH_ALL_RECORDS, payload: {recordType, data}})
}

const getRecord =  (id, baseUrl, recordType) => async dispatch => {
  const data = await services.fetchRecord(id, baseUrl)
  return dispatch({type: types.FETCH_RECORD, payload: {recordType, data}})
}

const createRecord =  (record, baseUrl, recordType)  => async dispatch => {
  console.log('Record type: ', recordType, ' Base Url: ', baseUrl)
  const data = await services.createRecord(record, baseUrl)
  console.log('Data: ', data)
  return dispatch({type: types.CREATE_RECORD, payload: {recordType, data}})
}

const updateRecord =  (id, record, baseUrl, recordType) => async dispatch => {
  const data = await services.updateRecord(id, record, baseUrl)
  return dispatch({type: types.UPDATE_RECORD, payload: {recordType, data}})
}

const deleteRecord = (id, baseUrl, recordType) => async dispatch => {
  await services.deleteRecord(id, baseUrl)
  return dispatch({type: types.DELETE_RECORD, payload: {recordType, data: {id}}})
}

const loginPerson = (baseUrl, values) => async dispatch => {
  const data = await services.loginUser(baseUrl, values)
  if (data) {
    return dispatch({type: types.PERSON_LOGIN, payload: data})
  }
  return dispatch({type: types.OPERATION_ERROR})
}

export default {
  getAllRecords,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecord,
  loginPerson
}
