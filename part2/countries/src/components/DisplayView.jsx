import DetailView from './DetailView'
import ListView from './ListView'

const DisplayView = ({ data, currentCountry, setCurrentCountry }) => {
  if (currentCountry) {
    return <DetailView country={currentCountry} />
  }

  const size = data.length
  if (size > 10) {
    return <span>Too many matches, specify another filter</span>
  }
  if (size > 1) {
    return <ListView list={data} setCurrentCountry={setCurrentCountry} />
  }
  if (size === 1) {
    return <DetailView country={data[0]}/>
  }
}

export default DisplayView
