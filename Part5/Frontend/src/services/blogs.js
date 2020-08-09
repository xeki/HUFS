import axios from 'axios'
const baseUrl = 'http://localhost:3000/app/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addBlog = async (blog) => {
  const { title, author, token, url } = blog
  axios.defaults.headers['x-auth'] = `bearer ${token}`
  const response = await axios.post(baseUrl, { title, author, url })
  return response
}

const updateBlog = async (blog, token) => {
  const { id, title, author, url, likes } = blog
  axios.defaults.headers['x-auth'] = `bearer ${token}`
  const response = await axios.put(`${baseUrl}/${id}`, { id, title, author, url, likes })
  return response
}

const deleteBlog = async (id, token) => {
  axios.defaults.headers['x-auth'] = `bearer ${token}`
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response
}

export default { getAll, addBlog, updateBlog, deleteBlog }
