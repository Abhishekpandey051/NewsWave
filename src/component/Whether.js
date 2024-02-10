import React, { useEffect, useState } from 'react';
import PlaceIcon from '@mui/icons-material/Place';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import Brightness5Icon from '@mui/icons-material/Brightness5';
const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("surat");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7857960d1a36ef5f3fea0c422367eb41`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch weather data');
      }

      const data = await response.json();
      console.log("response", data);
      setWeatherData(data);
      setError(null); // Reset error if the request is successful
    } catch (error) {
      console.error("Error fetching weather data", error);
      setWeatherData(null);
      setError(error.message || 'Failed to fetch weather data');
    }
  };

  let celsiusTemperature = weatherData?.main?.temp - 273.15;
// Sunrise
  const timestamp = weatherData?.sys?.sunrise
const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
const options = { hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'Asia/Kolkata' };
const formattedTime = date.toLocaleString('en-IN', options);

//Sunset
const sunset_timestamp = weatherData?.sys?.sunset;
const sunset_date = new Date(sunset_timestamp * 1000); // Convert seconds to milliseconds
const sunset_options = { hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'Asia/Kolkata' };
const sunset_formattedTime = sunset_date.toLocaleString('en-IN', sunset_options);

//24 hr

const sunriseTimestamp = weatherData?.sys?.sunrise;
const sunriseDate = new Date(sunriseTimestamp * 1000); // Convert seconds to milliseconds

const sunsetTimestamp = weatherData?.sys?.sunset;
const sunsetDate = new Date(sunsetTimestamp * 1000); // Convert seconds to milliseconds

// Calculate day length in milliseconds
const dayLengthMilliseconds = sunsetDate - sunriseDate;

// Convert day length from milliseconds to hours and minutes
const dayLengthHours = Math.floor(dayLengthMilliseconds / (1000 * 60 * 60));
const dayLengthMinutes = Math.floor((dayLengthMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

const dayLengthFormatted = `${dayLengthHours} hr ${dayLengthMinutes} min`;
  return (
    <>
      {console.log(error)}
      <section className="bg-gray-50 dark:bg-gray-900 img">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-3 space-y-4 md:space-y-6 sm:p-8 bg-gray-900">
              <div className='flex items-center'>
                <PlaceIcon className='text-white text-xs' />
                <input
                  className='w-full px-4 bg-gray-500 text-white py-1 border border-gray-500 rounded-md focus:outline-none focus:border-gray-500'
                  type='text'
                  placeholder={weatherData?.name}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
  
                />
              </div>
              <div className='img2 shadow-lg p-4'>
                <h1 className='text-white'>{city}, {weatherData?.sys?.country}</h1>
                <div className=' flex justify-between content-center'>
                  <h1 className='temp text-white'>{celsiusTemperature?.toFixed(0) + "°C"}</h1>
                  {weatherData && (
                    <img
                      src={`https://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@2x.png`}
                      alt="Weather Icon"
                      className='temp'
                    />
                  )}
                </div>
                <p className='rain text-white'>{weatherData?.weather[0]?.main}</p>
                <p className='flex text-white'>{weatherData?.weather[0]?.description}</p>
                <p className='para'>loredfvj dfs bjh fgjhkghdfg g ohgoidgoi fodigdo dkghod eydeyyuguyggrrtgte tgtrgrger </p>
                <div className='box1'>
                  <div className='bg-white  box2 shadow-lg p-4'>
                    <div className='content-center h-full w-full'>
                        <WbSunnyIcon className=' text-9xl icon'/>
                      <h1 className='content-center title'>Sunrise</h1>
                      <h1 className='content-center title'>{formattedTime}</h1>
                    </div>
                  </div>
                  <div className='bg-white box2 shadow-lg p-4'>
                    <div className='content-center h-full w-full'>
                    <WbTwilightIcon className='text-9xl icon1 text-orange-700'/>
                    <h1 className='content-center title'>Sunset</h1>
                    <h1 className='content-center title'>{sunset_formattedTime}</h1>
                    </div>
                  </div>
                </div>
                <div className='box1'>
                  <div className='bg-white  box2 shadow-lg p-4'>
                    <div className='content-center h-full w-full'>
                    <Brightness5Icon  className=' text-9xl icon'/>
                    <h1  className='content-center title'>Day length</h1>
                    <h1 className='content-center title'>{dayLengthFormatted}</h1>
                    </div>
                  </div>
                  <div className='bg-white box2 shadow-lg p-4'>
                    df
                  </div>
                </div>
              </div>
              {error && (
                <div className="text-red-500 text-sm">
                  Error: {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Weather;
