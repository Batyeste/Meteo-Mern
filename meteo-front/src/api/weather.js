import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL 


/**
 * 
 * router.post('/weather', addWeather);
router.get('/weather/:villeId', getWeatherParVille);
router.put('/weather/:villeId', updateWeather);
router.delete('/weather/:villeId', deleteWeather);
 */

export default async function getWeatherParVille (villeId) {
    try {
        const response = await axios.get(`${API_URL}/weather/${villeId}`);
        return response.data;
    } catch (error) {
        console.error("erreur lors de la récupération de la météo ; ", error);
        throw error;
    }
};

export const addWeather = async (ville, temperature, humidity, conditions, windSpeed, img) => {
    try {
        const response = await axios.post(`${API_URL}/weather`, { ville, temperature, humidity, conditions, windSpeed, img });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de l'ajout de la météo :", error);
        throw error;
    }
}

// src/api/weather.js
export const updateWeather = async (villeId, formData) => {
    try {
      console.log('Données reçues:', { villeId, formData });
      const response = await axios.put(`${API_URL}/weather/${villeId}`, formData);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la météo :", error);
      throw error;
    }
  };

export const deleteWeather = async (villeId) => {
    try {
        const response = await axios.delete(`${API_URL}/weather/${villeId}`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la suppression de la météo :", error);
        throw error;
    }
}
