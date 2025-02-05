import React, { useState } from 'react';
import axios from 'axios';

export default function WeatherApp2() {
  const api_key = '15dc64091ec65da009c9a0f80e8b1598';
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const FindCity = () => {
    if (!city) {
      setError("Please enter a city name!");
      return;
    }

    setError(""); // Clear previous errors

    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`)
      .then((response) => setWeatherData(response.data))
      .catch((error) => setError("Something went wrong! Check city name."));
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Arial' }}>
      <h2>🌤️ Weather App</h2>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter City"
        style={{ padding: '8px', marginRight: '10px', borderRadius: '5px' }}
      />
      <button onClick={FindCity} style={{ padding: '8px', cursor: 'pointer' }}>
        🔍 Search
      </button>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

      {weatherData && (
        <div style={{ marginTop: '20px', padding: '20px', borderRadius: '10px', backgroundColor: '#f8f9fa' }}>
          <h3>{weatherData.name} ({weatherData.sys.country})</h3>
          <p>🌡 Temperature: {weatherData.main.temp}°C</p>
          <p>💧 Humidity: {weatherData.main.humidity}%</p>
          <p>🌥 Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}
