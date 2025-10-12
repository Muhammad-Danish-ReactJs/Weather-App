import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import "./WeatherApp.css";
import { useState } from "react";

export default function WeatherApp() {
  const [weatherData, setWeatherData] = useState("");

  const handleWeatherData = (data) => {
    setWeatherData(data);
  };

  return (
    <div className="weather-app">
      <SearchBox onWeatherData={handleWeatherData} />
      <InfoBox weatherData={weatherData} />
    </div>
  );
}