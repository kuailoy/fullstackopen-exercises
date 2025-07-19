import axios from 'axios'

const apiKey = import.meta.env.VITE_WEATHER_KEY
const baseUrl = `https://api.openweathermap.org/data/2.5/weather`

const getByLocation = ({ lat, lon }) =>
  axios
    .get(baseUrl, {
      params: {
        appid: apiKey,
        lat,
        lon,
        units: 'metric'
      },
    })
    .then(response => response.data)

export default {
  getByLocation,
}
