import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./SearchBox.css";
import { useState } from "react";
export default function SearchBox({onWeatherData}) {
  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "8e45dae0812964e7734f8d048b0cd536";
  let [city, setCity] = useState("");

  let fetchWeatherData = async (city) => {
    try {
      let response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      let data = await response.json();

      let weatherData = {
        city: data.name,
        temp: data.main.temp,
        tempMin: data.main.temp_min,
        tempMax: data.main.temp_max,
        humidity: data.main.humidity,
        feelslike: data.main.feels_like,
        description: data.weather[0].description,
      };
      console.log(weatherData)
      return weatherData; // Return the weather data object
       

    } catch (error) {
      console.error("Error fetching weather data:", error);
    }

    // You can handle the fetched data here, e.g., update state or display it
    // For example, you might want to set the weather data in a state variable
  };
  let handleChange = (e) => {
    setCity(e.target.value);
  };
  let handleSubmit = async (e) => {
    e.preventDefault();
    console.log("City:", city);
    setCity("");  
    let newInfo = await fetchWeatherData(city);
    onWeatherData(newInfo)
  };
  return (
    <div className="search-box">
      <h2>Search for the Weather </h2>
      <form onSubmit={handleSubmit}>
        <TextField
          id="city"
          label="City Name"
          variant="outlined"
          required
          value={city}
          onChange={handleChange}
        />
        <br />
        <br />
        <Button variant="contained" type="submit">
          Search
        </Button>
      </form>
    </div>
  );
}
