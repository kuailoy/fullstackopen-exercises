import { useEffect, useState, useMemo } from 'react'
import SearchInput from './components/SearchInput'
import DisplayView from './components/DisplayView'
import countryService from './service/country'

const App = () => {
  const [searchValue, setSearchValue] = useState('')
  const [countries, setCountries] = useState([])
  const [currentCountry, setCurrentCountry] = useState(null)

  const handleSearch = event => {
    setSearchValue(event.target.value)
    setCurrentCountry(null)
  }

  useEffect(() => {
    // initail data
    countryService.getAll().then(data => {
      setCountries(data)
    })
  }, [])

  const filteredCountries = useMemo(() => {
    if (!searchValue) {
      return []
    }
    const normalizedValue = searchValue.toUpperCase()
    return countries.filter(({ name }) => name.common.toUpperCase().includes(normalizedValue))
  }, [searchValue, countries])

  return (
    <div>
      <SearchInput value={searchValue} onChange={handleSearch} />
      <br />
      <DisplayView data={filteredCountries} currentCountry={currentCountry} setCurrentCountry={setCurrentCountry} />
    </div>
  )
}

export default App
