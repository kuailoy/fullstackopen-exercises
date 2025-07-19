

const WeatherDisplay = ({ weather: { temperature, windSpeed, icon }, capitalCity }) => {

  return (
    <div>
      <h2>Weather in {capitalCity}</h2>
      <p>Temperature {temperature} Celsius</p>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
      <p>Wind {windSpeed} m/s</p>
    </div>
  )
}

export default WeatherDisplay
