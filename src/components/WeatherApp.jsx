import { useState } from "react";
import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";

export default function WeatherApp() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleError = () => setWeatherData(null);

  return (
    <div>
      <SearchBox
        onWeatherData={setWeatherData}
        onLoading={setLoading}
        onError={handleError}
      />
      <InfoBox weatherData={weatherData} loading={loading} />
    </div>
  );
}
