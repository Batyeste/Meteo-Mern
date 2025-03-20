// src/pages/WeatherPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import getWeatherParVille from "../api/weather";
import Loader from "../components/common/loader";
import ErrorMessage from "../components/common/errorMessage";
import WeatherCard from "../components/weather/weatherCard";
import WeatherMap from "../components/weather/weatherMaps";

const WeatherPage = () => {
  const { villeId } = useParams();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadWeather = async () => {
      try {
        const data = await getWeatherParVille(villeId);
        // console.log("Données reçues:", data);
        setWeather(data);
        setLoading(false);
      } catch (err) {
        setError("Impossible de charger les données météo pour cette ville.");
        setLoading(false);
      }
    };

    loadWeather();
  }, [villeId]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="flex flex-col gap-8">
      {weather && (
        <>
          <div className="flex justify-between items-center flex-wrap gap-4 mb-4">
            <h1 className="text-3xl font-bold">
              Météo à {weather.ville}, {weather.pays}
            </h1>
            <Link
              to={`/pays/${weather}/villes`}
              className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Retour aux villes
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <WeatherCard villeId={villeId} weatherData={weather.current} />
            <WeatherMap latlont={weather.current} />
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">
              Prévisions pour les prochains jours
            </h2>
            SOON
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherPage;
