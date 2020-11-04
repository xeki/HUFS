import axios from 'axios'

const getUrl = (name) => `https://restcountries.eu/rest/v2/name/${name}?fullText=true`

export const getCountry = async (name) => {
  console.log("I got called to duty")
  if (!name) return null;
  try {
    const URL = getUrl(name)
    const response = await axios.get(URL)
    return response.data
  } catch ({message}) {
    console.error('Error: ', message)
    return {found: false}
  }
}
