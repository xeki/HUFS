import axios from 'axios'
import Crypto from 'crypto-js'
import dotEnv from 'dotenv'
import jwt from 'jsonwebtoken'
dotEnv.config()

const salt = process.env.SECRET_KEY

export const createRecord = async (resource, baseUrl) => {
  try {
    const res = await axios.post(baseUrl, resource)
    return res.data
  } catch (err) {
    console.error('Error: ', err.message)
    return null
  }
}

export const updateRecord = async (id, values, baseUrl) => {
  try {
    const res = await axios.put(`${baseUrl}/${id}`, values)
    return res.data
  } catch (error) {
    console.error('Error: ', error.message)
    return null
  }
}

export const deleteRecord = async (id, baseUrl) => {
  try {
    const res = await axios.delete(`${baseUrl}/${id}`)
    return res.data
  } catch (error) {
    console.error('Error: ', error.message)
    return null
  }
}

export const fetchRecord = async (id, baseUrl) => {
  try {
    const res = await axios.get(`${baseUrl}/${id}`)
    return res.data
  } catch (error) {
    console.error('Error :', error.message)
    return null
  }
}

export const fetchAll = async (baseUrl) => {
  try {
    const res = await axios.get(baseUrl)
    return res.data
  } catch (err) {
    console.error('Error: ', err.message)
    return []
  }
}

export const loginUser = async (baseUrl, id, values) => {
  try {
    const { password, userName } = values
    const pw = Crypto.AES.encrypt(password, salt)
    const res = await axios.get(`${baseUrl}?userName=${userName}&password=${pw}`)
    if (res) {
        const data = res.data    
        const authToken = jwt.sign({userName: data.userName}, salt)
        return {authToken, id: data.id}
      }
      return null
  } catch (e) {
    return null
  }
}

export const createUser = async (baseUrl, {userName, password}) => {
  try {
    const pw = Crypto.encrypt(password, salt)
    const res = await axios.psot(baseUrl, {password: pw, userName})
    return res
  } catch (e) {
    return null
  }
}

export const createNoteByUser = async (baseUrl, userName, authToken, values) => {
  const decoded = jwt.verify(authToken, salt)
  if (userName !== decoded.userName) {
    return null
  }
  try {
    const res = await axios.post(baseUrl, {...values, userName })
    return res.data
  } catch(e) {
    console.log(e.message)
    return null
  }
}
