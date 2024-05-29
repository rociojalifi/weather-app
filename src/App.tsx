import React, { useState } from "react";
import { getWeather } from "./services/weatherService";
import "./App.css";

const App: React.FC = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    try {
      const data = await getWeather(city);
      setWeather(data);
      setError("");
    } catch (err) {
      setError("City not found");
      setWeather(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100">
      <h1 className="text-4xl mb-4">Weathero</h1>
      <div className="mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="px-4 py-2 border rounded-md"
        />
        <button
          onClick={fetchWeather}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Get Weather
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {weather && (
        <div className="text-center">
          <h2 className="text-2xl">{weather.name}</h2>
          <p className="text-xl">{weather.main.temp}°C</p>
          <p>{weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default App;
