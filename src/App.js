import "./App.css";
import Search from "./components/search/search";

import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import Forecast from "./components/forecast/Forecast";
import { useState } from "react";
import Current_Weather from "./components/current-weather/Current_Weather";
function App() {
  const [CurrentWeather, setcurrentWeather] = useState(null);
  const [forecast, setforecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    console.log(lat,lon);

    const CurrentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );


    Promise.all([CurrentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setcurrentWeather({ city: searchData.label, ...weatherResponse });
        setforecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };
  console.log(CurrentWeather);
  console.log(forecast);
  return (
    <div className="App">
      <Search onSearchchange={handleOnSearchChange} />
      {CurrentWeather && <Current_Weather data={CurrentWeather}/>}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
