import { useEffect, useState } from 'react'
import WeatherDisplay from './WeatherDisplay'
import weatherService from '../service/weather'

const DetailView = ({ country: { name, capital, area, languages, flags, capitalInfo } }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const [lat, lon] = capitalInfo.latlng
    weatherService.getByLocation({ lat, lon }).then(({ main, wind, weather }) => {
      const weatherData = {
        temperature: main.temp,
        windSpeed: wind.speed,
        icon: weather?.[0].icon,
      }
      setWeather(weatherData)
    })
  }, [])

  return (
    <div>
      <h1>{name.common}</h1>
      <span>Capital {capital[0]}</span>
      <br />
      <span>Area {area}</span>
      <h2>Languages</h2>
      <ul>
        {Object.entries(languages).map(([key, value]) => (
          <li key={key}>{value}</li>
        ))}
      </ul>
      <p>
        <img src={flags.png} alt={flags.alt} />
      </p>
      {weather && <WeatherDisplay weather={weather} capitalCity={capital[0]} />}
    </div>
  )
}

export default DetailView
