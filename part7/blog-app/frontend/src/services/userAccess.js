import axios from 'axios'
require('dotenv').config({})

const url = 'http://localhost:3000/api/users/login'
const authenticate = async ({ userName, password }) => {
  try {
    const response = await axios.post(url, { userName, password })
    if (response) {
      return response.data
    } else {
      return false
    }
  } catch (e) {
    console.log('Login error: ', e)
    return false
  }
}

export default { authenticate }
