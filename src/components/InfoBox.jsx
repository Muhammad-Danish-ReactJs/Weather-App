import {
  WiDaySunny,
  WiRain,
  WiCloudy,
  WiSnow,
  WiThunderstorm,
  WiFog,
} from "react-icons/wi";
import "../styles/InfoBox.css";

function getWeatherIcon(description) {
  if (description.includes("rain") || description.includes("drizzle"))
    return <WiRain className="weather-wi-icon" />;
  if (description.includes("cloud"))
    return <WiCloudy className="weather-wi-icon" />;
  if (description.includes("snow"))
    return <WiSnow className="weather-wi-icon" />;
  if (description.includes("thunderstorm"))
    return <WiThunderstorm className="weather-wi-icon" />;
  if (description.includes("fog") || description.includes("mist") || description.includes("haze"))
    return <WiFog className="weather-wi-icon" />;
  return <WiDaySunny className="weather-wi-icon" />;
}

export default function InfoBox({ weatherData, loading }) {
  if (loading) {
    return (
      <div className="info-box">
        <div className="info-loading">
          <div className="spinner" />
          <p>Fetching weather data...</p>
        </div>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="info-box">
        <div className="info-empty">
          <span className="empty-icon">🌍</span>
          <p>Search for a city to see weather info</p>
        </div>
      </div>
    );
  }

  return (
    <div className="info-box">
      <p className="weather-city">
        📍 {weatherData.city}, {weatherData.country}
      </p>

      <div className="weather-main">
        <span className="weather-temp">{weatherData.temp}°C</span>
        {getWeatherIcon(weatherData.description)}
      </div>

      <p className="weather-desc">{weatherData.description}</p>

      <div className="weather-details">
        <div className="detail-card">
          <p className="detail-label">Min Temp</p>
          <p className="detail-value">{weatherData.tempMin}°C</p>
        </div>
        <div className="detail-card">
          <p className="detail-label">Max Temp</p>
          <p className="detail-value">{weatherData.tempMax}°C</p>
        </div>
        <div className="detail-card">
          <p className="detail-label">Humidity</p>
          <p className="detail-value">{weatherData.humidity}%</p>
        </div>
        <div className="detail-card">
          <p className="detail-label">Feels Like</p>
          <p className="detail-value">{weatherData.feelslike}°C</p>
        </div>
      </div>
    </div>
  );
}
