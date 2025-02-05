import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function WeatherApp() {
  const api_key = '15dc64091ec65da009c9a0f80e8b1598';
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const findCity = () => {
    if (!city) {
      setError("❌ Please enter a city name!");
      return;
    }
    setError(""); // Clear previous errors

    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`)
      .then((response) => setWeatherData(response.data))
      .catch(() => setError("❌ Something went wrong! Check the city name."));
  };

  return (
    <div className="container text-center mt-5">
      <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: '500px', borderRadius: '15px' }}>
        <h2 className="mb-4">🌤️ Weather App</h2>
        
        {/* Input and Button */}
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter City Name"
          />
          <button className="btn btn-primary" onClick={findCity}>
            🔍 Search
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-danger">{error}</p>}

        {/* Weather Data Display */}
        {weatherData && (
          <div className="card bg-light mt-3 p-3">
            <h3 className="fw-bold">{weatherData.name} ({weatherData.sys.country})</h3>
            <p className="mb-1">🌡 <strong>Temperature:</strong> {weatherData.main.temp}°C</p>
            <p className="mb-1">💧 <strong>Humidity:</strong> {weatherData.main.humidity}%</p>
            <p className="mb-1">🌥 <strong>Weather:</strong> {weatherData.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
