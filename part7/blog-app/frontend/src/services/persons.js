import axios from 'axios'
const baseUrl = 'http://localhost:3000/api/users'

const getPersonById = async (id) => {
  const {data} = await axios.get(`${baseUrl}/${id}`)
  return data
}

const createNewPerson = (person) => {
  const {data} = axios.post(baseUrl, person)
  return data
}

export default { getPersonById, createNewPerson }
