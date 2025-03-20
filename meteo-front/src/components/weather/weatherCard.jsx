// src/components/Weather/WeatherCard.jsx
import React, { useState } from "react";
import { Edit, Check, X, MoreVertical } from "lucide-react";
import { updateWeather } from "../../api/weather";

export default function WeatherCard({ villeId, weatherData, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [formData, setFormData] = useState({
    temperature: weatherData.temperature || 0,
    humidity: weatherData.humidity || 0,
    windSpeed: weatherData.windSpeed || 0,
    conditions: weatherData.conditions || "",
  });

  if (!weatherData) return null;

  const { img } = weatherData;
  const iconUrl = img;

  const kelvin = weatherData.temperature;
  const fahrenheit = (kelvin - 273.15) * 9 / 5 + 32;
  const celsius = (fahrenheit - 32) * 5 / 9;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      console.log('Mise à jour des données météo:', villeId, 'avec les données:', formData);
      await updateWeather(villeId, formData);
      setIsEditing(false);
      if (onUpdate) onUpdate(); 
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données météo :", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
      <div className="absolute top-2 right-2 z-10">
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <MoreVertical size={16} className="text-gray-500" />
        </button>

        {showOptions && (
          <div className="absolute right-0 mt-1 bg-white shadow-lg rounded-md py-1 w-32 border border-gray-100">
            <button
              onClick={() => {
                setIsEditing(true);
                setShowOptions(false);
              }}
              className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center text-sm"
            >
              <Edit size={14} className="mr-2 text-blue-500" />
              Modifier
            </button>
          </div>
        )}
      </div>

      {!isEditing ? (
        <div className="p-6 flex justify-between items-center">
          <div>
            <span className="text-5xl font-bold">{Math.round(celsius)}°C</span>
            <p className="text-lg text-gray-700 mt-2">{weatherData.conditions}</p>
            <p className="text-sm text-gray-500 mt-1">
              {Math.round(kelvin)}K → {Math.round(fahrenheit)}°F →{" "}
              {Math.round(celsius)}°C
            </p>
            <p className="text-sm text-gray-500 mt-1">Humidité : {weatherData.humidity}%</p>
            <p className="text-sm text-gray-500 mt-1">Vent : {weatherData.windSpeed} m/s</p>
          </div>

          <div className="flex-shrink-0">
            <img
              src={iconUrl}
              alt={weatherData.conditions || "Conditions météo"}
              className="w-20 h-20 object-contain"
            />
          </div>
        </div>
      ) : (
        <div className="p-6">
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Température (K)
            </label>
            <input
              type="number"
              name="temperature"
              value={formData.temperature}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Humidité (%)
            </label>
            <input
              type="number"
              name="humidity"
              value={formData.humidity}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vitesse du vent (m/s)
            </label>
            <input
              type="number"
              name="windSpeed"
              value={formData.windSpeed}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Conditions
            </label>
            <input
              type="text"
              name="conditions"
              value={formData.conditions}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 bg-gray-100 rounded text-gray-600 text-sm flex items-center"
            >
              <X size={14} className="mr-1" />
              Annuler
            </button>
            <button
              onClick={handleSubmit}
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm flex items-center"
            >
              <Check size={14} className="mr-1" />
              Enregistrer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}