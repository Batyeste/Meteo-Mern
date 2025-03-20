import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL 

export const fetchPays = async () => {
  try {
    const response = await axios.get(`${API_URL}/pays`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des pays :', error);
    throw error;
  }
};

export const fetchVillesByPays = async (paysId) => {
  try {
    const response = await axios.get(`${API_URL}/villes/${paysId}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des villes :', error);
    throw error;
  }
};

export const fetchWeatherByVille = async (villeId) => {
  try {
    const response = await axios.get(`${API_URL}/weather/${villeId}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération de la météo :', error);
    throw error;
  }
};