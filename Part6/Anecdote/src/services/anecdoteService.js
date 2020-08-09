import axios from 'axios'

const BASE_URL = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const addAnecdote = async (content) => {
  const anecdote = asObject(content)
  const response = await axios.post(BASE_URL, anecdote)
  return response.data
}

export const fetchAllAnecdotes = async () => {
  const response = await axios.get(BASE_URL)
  return response.data
}

export const voteForAnecdoteService = async (anecdote) => {
  const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}
  const response = await axios.put(`${BASE_URL}/${anecdote.id}`, updatedAnecdote)
  return response.data
}
