import axios from 'axios';

export const deletePerson = (url, id) => {
  return axios.delete(`${url}/${id}`)
}

export const addPerson = (url, person) => 
  axios.post(url, person).then(res => res.data)

export const updatePerson = (url, id, newPerson) =>  axios.put(`${url}/${id}`, newPerson)

export const getPersons = (url) => axios.get(url).then(response => response.data)
