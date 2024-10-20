import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import searchIcon from '../Assets/search.png'
import clearIcon from '../Assets/clear.png'
import cloudIcon from '../Assets/cloud.png'
import drizzleIcon from '../Assets/drizzle.png'
import humidityIcon from '../Assets/humidity.png'
import rainIcon from '../Assets/rain.png'
import snowIcon from '../Assets/snow.png'
import windIcon from '../Assets/wind.png'

const Weather = () => {

  const inputRef = useRef();

  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": cloudIcon,
    "03n": cloudIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon,
  }

  const search = async (city) => {
    if(city === ""){
      alert("Please Enter a City Name");
      return;
    }

    try {

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();

      if(!response.ok){
        alert(data.message);
        return;
      }
      
      console.log(data);
      const weatherSymbol = allIcons[data.weather[0].icon] || clearIcon;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: weatherSymbol
      })

    } catch (error) {
      setWeatherData(false);
      console.error("Error in Fetching Weather Data")
    }
  }

  useEffect(()=>{
    search("Lagos");
  }, [])

  return (
    <div className='weather'>

        <div className='search'>
            <input ref={inputRef} type='text' placeholder='Search' />
            <img alt='' src={searchIcon} onClick={()=>search(inputRef.current.value)} />
        </div>
        
        {weatherData ? <>
          <img alt='' src={weatherData.icon} className='weatherIcon'/>
          <p className='temperature'>{weatherData.temperature}&deg;c</p>
          <p className='location'>{weatherData.location}</p>

          <div className='weather-data'>
              <div className='col'>
                  <img alt='' src={humidityIcon} />
                  <div className='col-data'>
                    <p>{weatherData.humidity} %</p>
                    <span>Humidity</span>
                  </div>
              </div>

              <div className='col'>
                  <img alt='' src={windIcon} />
                  <div className='col-data'>
                    <p>{weatherData.windSpeed} km/h</p>
                    <span>Wind Speed</span>
                  </div>
              </div>
          </div>
        </> : <></>}
        
    </div>
  )
}

export default Weather