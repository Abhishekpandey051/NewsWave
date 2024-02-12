import React, { useEffect, useState } from 'react';
import PlaceIcon from '@mui/icons-material/Place';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import DarkModeIcon from '@mui/icons-material/DarkMode';
// import Brightness5Icon from '@mui/icons-material/Brightness5';
import Footer from './Footer';
import TimeDate from './TImeDate';
const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Noida");
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
      setError(null);
    } catch (error) {
      console.error("Error fetching weather data", error);
      setWeatherData(null);
      setError(error.message || 'Failed to fetch weather data');
    }
  };

  let celsiusTemperature = weatherData?.main?.temp - 273.15;

  const timestamp = weatherData?.sys?.sunrise
  const date = new Date(timestamp * 1000);
  const options = { hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'Asia/Kolkata' };
  const formattedTime = date.toLocaleString('en-IN', options);

  //sunset

  const sunset_timestamp = weatherData?.sys?.sunset;
  const sunset_date = new Date(sunset_timestamp * 1000);
  const sunset_options = { hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'Asia/Kolkata' };
  const sunset_formattedTime = sunset_date.toLocaleString('en-IN', sunset_options);

  const currentTime = Date.now() / 1000;
 

  const isSunrise = currentTime > timestamp;
const isSunset = currentTime > timestamp && currentTime < sunset_timestamp;
console.log(isSunrise);

// Calculate day length in milliseconds
const dayLengthMilliseconds = sunset_date - date;

// Convert day length from milliseconds to hours and minutes
const dayLengthHours = Math.floor(dayLengthMilliseconds / (1000 * 60 * 60));
const dayLengthMinutes = Math.floor((dayLengthMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

const dayLengthFormatted = `${dayLengthHours} hr ${dayLengthMinutes} min`;
console.log("dayLength", dayLengthFormatted);
const currentDate = new Date();

// Formatting options for Indian time zone (IST)
const optionss = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  // second: '2-digit',
  hour12: true,
  timeZone: 'Asia/Kolkata'
};

// Format the date and time in Indian time zone
const formattedDateTime = currentDate.toLocaleString('en-IN', optionss);
console.log(formattedDateTime);


  return (
    <>
      {console.log(error)}
      <div className={isSunrise ? 'container2' : (isSunset? 'container1':'')}>
        <section className="img">
          <div className='flbox'>

            <div className=" flex shadow-lg gap-4 justify-center justify-items-center	items-center	px-8 py-8">
              <div className="w-full vv rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-3 space-y-4 md:space-y-6 sm:p-8 boxcolor">
                  <div className='flex items-center inputbox'>
                    <PlaceIcon className='text-white text-xs location' />
                    <input
                      className='input w-full px-4 text-white'
                      type='text'
                      placeholder={weatherData?.name}
                      value={city}
                      onChange={(e) => setCity(e.target.value)}

                    />
                  </div>
                  <div className='hhhhh'>
                    <div className=' flex justify-between content-center'>
                      <div className='temops'>
                        <h1 className='temp text-white'>{celsiusTemperature?.toFixed(0) + "°C"}</h1>
                        <p className='flex text-white'>{weatherData?.weather[0]?.description}</p>
                      </div>
                      <div className='imgdd'>
                        {weatherData && (
                          <img
                            src={`https://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@2x.png`}
                            alt="Weather Icon"
                            className='temp'
                          />
                        )}
                        <p className='rain text-white'>{weatherData?.weather[0]?.main}</p>
                      </div>
                    </div>
                    

                    <p className='para text-white'><TimeDate/> </p>
                    <div className='box1 vi'>
                      <div className='vish box2 shadow-lg p-4'>
                        <div className='content-center h-full w-full'>
                          <WbSunnyIcon className=' text-9xl icon' />
                          <h1 className='content-center title'>Sunrise</h1>
                          <h1 className='content-center title'>{formattedTime}</h1>
                        </div>
                      </div>
                      <div className='vish box2 shadow-lg p-4'>
                        <div className='content-center h-full w-full'>
                          <DarkModeIcon className='text-9xl icon2' />
                          <h1 className='content-center title'>Sunset</h1>
                          <h1 className='content-center title'>{sunset_formattedTime}</h1>
                        </div>
                      </div>
                    </div>
                    <div className='box1'>
                      <div className='vish  box2 shadow-lg p-4'>
                        <div className='content-center h-full w-full'>
                          <WbTwilightIcon className='text-9xl icon' />
                          <h1 className='content-center title'>Day Length</h1>
                          <h1 className='content-center title'>{dayLengthFormatted}</h1>
                        </div>
                      </div>
                      <div className='vish box2 shadow-lg p-4'>
                        <div className='content-center h-full w-full'>
                          <WbTwilightIcon className='text-9xl icon' />
                          <h1 className='content-center title'>Sunset</h1>
                          <h1 className='content-center title'>{sunset_formattedTime}</h1>
                        </div>
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
              {/* new */}
              <div className="w-full vv rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-3 space-y-4 md:space-y-6 sm:p-8 boxcolor">

                  <div className='hhhh'>

                    <div className='box1'>
                      <div className='vish  box2 shadow-lg p-5'>
                        <h1 className='text-white'>Whether Day By Day</h1>
                        <div className='content-center h-full w-full flex gap-6 snap'>
                          <div className='secbox'>
                            <WbSunnyIcon className=' text-9xl icon' />
                            <h1 className='content-center title'>Sunrise</h1>
                            <h1 className='content-center title'>{formattedTime}</h1>
                          </div>
                          <div className='secbox'>
                            <WbSunnyIcon className=' text-9xl icon' />
                            <h1 className='content-center title'>Sunrise</h1>
                            <h1 className='content-center title'>{formattedTime}</h1>
                          </div>
                          <div className='secbox'>
                            <WbSunnyIcon className=' text-9xl icon' />
                            <h1 className='content-center title'>Sunrise</h1>
                            <h1 className='content-center title'>{formattedTime}</h1>
                          </div>
                          <div className='secbox'>
                            <WbSunnyIcon className=' text-9xl icon' />
                            <h1 className='content-center title'>Sunrise</h1>
                            <h1 className='content-center title'>{formattedTime}</h1>
                          </div>
                          <div className='secbox'>
                            <WbSunnyIcon className=' text-9xl icon' />
                            <h1 className='content-center title'>Sunrise</h1>
                            <h1 className='content-center title'>{formattedTime}</h1>
                          </div>
                          <div className='secbox'>
                            <WbSunnyIcon className=' text-9xl icon' />
                            <h1 className='content-center title'>Sunrise</h1>
                            <h1 className='content-center title'>{formattedTime}</h1>
                          </div>
                          <div className='secbox'>
                            <WbSunnyIcon className=' text-9xl icon' />
                            <h1 className='content-center title'>Sunrise</h1>
                            <h1 className='content-center title'>{formattedTime}</h1>
                          </div>
                          <div className='secbox'>
                            <WbSunnyIcon className=' text-9xl icon' />
                            <h1 className='content-center title'>Sunrise</h1>
                            <h1 className='content-center title'>{formattedTime}</h1>
                          </div>
                          <div className='secbox'>
                            <WbSunnyIcon className=' text-9xl icon' />
                            <h1 className='content-center title'>Sunrise</h1>
                            <h1 className='content-center title'>{formattedTime}</h1>
                          </div>
                        </div>

                      </div>

                    </div>
                    <div className='box1'>
                      <div className='vish  box2 shadow-lg p-5'>
                        <h1 className='text-white'>Whether Day By Day</h1>
                        <div className='content-center h-full w-full flex gap-6 snap'>
                          <div className='secbox'>
                            <WbSunnyIcon className=' text-9xl icon' />
                            <h1 className='content-center title'>Sunrise</h1>
                            <h1 className='content-center title'>{formattedTime}</h1>
                          </div>
                          <div className='secbox'>
                            <WbSunnyIcon className=' text-9xl icon' />
                            <h1 className='content-center title'>Sunrise</h1>
                            <h1 className='content-center title'>{formattedTime}</h1>
                          </div>
                          <div className='secbox'>
                            <WbSunnyIcon className=' text-9xl icon' />
                            <h1 className='content-center title'>Sunrise</h1>
                            <h1 className='content-center title'>{formattedTime}</h1>
                          </div>
                          <div className='secbox'>
                            <WbSunnyIcon className=' text-9xl icon' />
                            <h1 className='content-center title'>Sunrise</h1>
                            <h1 className='content-center title'>{formattedTime}</h1>
                          </div>
                          <div className='secbox'>
                            <WbSunnyIcon className=' text-9xl icon' />
                            <h1 className='content-center title'>Sunrise</h1>
                            <h1 className='content-center title'>{formattedTime}</h1>
                          </div>
                          <div className='secbox'>
                            <WbSunnyIcon className=' text-9xl icon' />
                            <h1 className='content-center title'>Sunrise</h1>
                            <h1 className='content-center title'>{formattedTime}</h1>
                          </div>
                          <div className='secbox'>
                            <WbSunnyIcon className=' text-9xl icon' />
                            <h1 className='content-center title'>Sunrise</h1>
                            <h1 className='content-center title'>{formattedTime}</h1>
                          </div>
                          <div className='secbox'>
                            <WbSunnyIcon className=' text-9xl icon' />
                            <h1 className='content-center title'>Sunrise</h1>
                            <h1 className='content-center title'>{formattedTime}</h1>
                          </div>
                          <div className='secbox'>
                            <WbSunnyIcon className=' text-9xl icon' />
                            <h1 className='content-center title'>Sunrise</h1>
                            <h1 className='content-center title'>{formattedTime}</h1>
                          </div>
                        </div>

                      </div>

                    </div>

                    <div className='box1'>
                      <div className='vish box2 shadow-lg p-4'>
                        <div className='content-center h-full w-full'>
                          <WbTwilightIcon className='text-9xl icon' />
                          <h1 className='content-center title'>Sunset</h1>
                          <h1 className='content-center title'>{sunset_formattedTime}</h1>
                        </div>
                      </div>
                      <div className='vish box2 shadow-lg p-4'>
                        <div className='content-center h-full w-full'>
                          <WbTwilightIcon className='text-9xl icon' />
                          <h1 className='content-center title'>Sunset</h1>
                          <h1 className='content-center title'>{sunset_formattedTime}</h1>
                        </div>
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
          </div>
        </section>
      </div>
      <Footer/> 
    </>
  );
}

export default Weather;
