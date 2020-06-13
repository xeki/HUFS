import React, {useState, useEffect} from 'react'
import axios from 'axios';

const CountryPage = (props) => {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [weather, setWeather] = useState('')

  useEffect(() => {
    if (searchText.trim() === '' && countries.length) {
      setCountries([]);
    } else {
      axios.get(`https://restcountries.eu/rest/v2/name/${searchText}`)
      .then(response => setCountries(response.data))
      .catch(e => setCountries([]))
    }
  }, [searchText, countries.length])

  useEffect(() => {
    if(countries.length === 1) {
      const latlng = countries[0].latlng;
      getWeatherData({lat: latlng[0], lng: latlng[1]})
    }
  },[countries,countries.length])

  const getWeatherData = ({lat, lng}) => {
    axios.get(`https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lng}`)
    .then(response => setWeather(response.data))
    .catch(err => setWeather(''))
  }

  const updateSearchText = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  }
  const renderResult = () => {
    let result;
    if (countries.length === 0) {
      result = 'There is no country for the search-term'
    } else if (countries.length === 1) {
      result = <CountryDetail country={countries[0]} weather={weather}/>
    } else if (countries.length > 10) {
      result = 'Too many features, specify another filter'
    } else {
      result = <CountryList setCountry={setSearchText} countries={countries} />
    }
    return result;
  }

  return(
    <div>
      <div>
        <input type="text" name="searchText" placeholder='Enter country name' value={searchText} onChange={updateSearchText} />
      </div>
      {renderResult()}
    </div>
  )
}

const CountryList = (props) => 
  props.countries.map(country => 
    <p key={country.name}>
      {country.name}
      <button style={{marginLeft: '5px'}} onClick={() =>props.setCountry(country.name)}>Show</button>
    </p>
  )

const CountryDetail = (props) => (
  <div>
    <h2>{props.country.name}</h2>
    <p>Capital: {props.country.capital}</p>
    <p>Population: {props.country.population}</p>
    <h2>Languages</h2>
    <ul>
      {props.country.languages.map(language => <li key={language.name}>{language.name}</li>)}
    </ul>
    <img src={props.country.flag} height='200px' width='300px' alt={props.country.name} />
    {props.weather && (
      <>
        <h2>Weather</h2>
        <p>Temperature: {props.weather.main.temp} &deg;C</p>
        <p>Wind: {props.weather.wind.speed}MPH</p>
      </>
    )}
  </div>
)

export default CountryPage;