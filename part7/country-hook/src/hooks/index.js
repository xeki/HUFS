import {useEffect} from 'react'
import {getCountry} from '../service'

export const useCountry = (name, setCountry) => {
  useEffect(() => {
    const fetchData = async () => {
      const country = await getCountry(name)
      country && country.length ? setCountry({found: true, ...country[0]}) : setCountry({found: false})
    }
    fetchData();
  }, [name, setCountry])
}
