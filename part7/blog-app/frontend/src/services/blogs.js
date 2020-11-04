import axios from 'axios'
const baseUrl = 'http://localhost:3000/app/blogs'

const getAll = async () => {
  const {data} = await axios.get(baseUrl)
  return data
}

const addBlog = async (blog) => {
  const { title, author, token, url } = blog
  axios.defaults.headers['x-auth'] = `bearer ${token}`
  const {data} = await axios.post(baseUrl, { title, author, url })
  return data
}

const updateBlog = async (blog, token) => {
  const { id, title, author, url, likes } = blog
  axios.defaults.headers['x-auth'] = `bearer ${token}`
  const {data} = await axios.put(`${baseUrl}/${id}`, { id, title, author, url, likes })
  return data
}

const deleteBlog = async (id, token) => {
  axios.defaults.headers['x-auth'] = `bearer ${token}`
  const {data} = await axios.delete(`${baseUrl}/${id}`)
  return data
}

const addComment = async(id, comment) => {
  try {
    const {data} = await axios.post(`${baseUrl}/${id}/comments`, {comment})
    return data
  } catch (e) {
    console.log('Error while trying to add a comment: ', e)
    return false
  }
}

export default { getAll, addBlog, updateBlog, deleteBlog, addComment }
