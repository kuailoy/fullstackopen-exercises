const ListView = ({ list, setCurrentCountry }) => {
  const showDetail = country => {
    setCurrentCountry(country)
  }
  return (
    <div>
      {list.map(country => (
        <p key={country.name.official}>
          {country.name.common} <button onClick={() => showDetail(country)}>show</button>
        </p>
      ))}
    </div>
  )
}

export default ListView
