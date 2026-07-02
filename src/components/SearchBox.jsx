import { useState } from "react";
import "../styles/SearchBox.css";

const API_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "8e45dae0812964e7734f8d048b0cd536";

export default function SearchBox({ onWeatherData, onLoading, onError }) {
  const [city, setCity] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (cityName) => {
    setLoading(true);
    onLoading(true);
    setError("");

    try {
      const res = await fetch(
        `${API_URL}?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      if (!res.ok) throw new Error("City not found");

      const data = await res.json();
      const weatherData = {
        city: data.name,
        country: data.sys.country,
        temp: Math.round(data.main.temp),
        tempMin: Math.round(data.main.temp_min),
        tempMax: Math.round(data.main.temp_max),
        humidity: data.main.humidity,
        feelslike: Math.round(data.main.feels_like),
        description: data.weather[0].description,
      };

      onWeatherData(weatherData);
      setRecentSearches((prev) =>
        [cityName, ...prev.filter((c) => c !== cityName)].slice(0, 5)
      );
    } catch (err) {
      setError("City not found. Please check the spelling and try again.");
      onError();
    } finally {
      setLoading(false);
      onLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    fetchWeather(city.trim());
    setCity("");
  };

  return (
    <div className="search-box">
      <h1 className="search-title">🌤 Weather App</h1>
      <p className="search-subtitle">Get real-time weather for any city</p>

      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="search-input"
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="search-btn" type="submit" disabled={loading}>
          {loading ? "..." : "Search"}
        </button>
      </form>

      {error && <div className="error-msg">⚠️ {error}</div>}

      {recentSearches.length > 0 && (
        <div className="recent-searches">
          <p className="recent-label">Recent</p>
          <div className="recent-chips">
            {recentSearches.map((s) => (
              <button
                key={s}
                className="recent-chip"
                onClick={() => fetchWeather(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
