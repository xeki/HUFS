import axios from 'axios'
const url = 'http://localhost:3000/api/users/login'
const authenticate = async ({ userName, password }) => {
  const response = await axios.post(url, { userName, password })
  if (response) {
    return response.data
  } else {
    return false
  }
}

export { authenticate }
