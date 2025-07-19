import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => axios.get(`${baseUrl}/all`).then(response => response.data)

const fetchByName = countryName => axios.get(`${baseUrl}/name/${countryName}`).then(response => response.data)

export default {
  getAll,
  fetchByName,
}
