/**
 * router.post('/villes', addVille);
router.get('/villes/:paysId', getVillesParPays);
router.put('/villes/:villeId', updateVille);
router.delete('/villes/:villeId', deleteVille);
 */
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL 

export const getVillesParPays = async (villeId) => {
    try {
        const response = await axios.get(`${API_URL}/villes/${villeId}`);
        return response.data;
    } catch (error) {
        console.error("erreur lors de la récupération de la ville ; ", error);
        return [];
    }
};

export default async function addVille(name, paysId, latitude, longitude) {
    try {
        console.log('name', name, 'paysId', paysId, 'latitude', latitude, 'longitude', longitude);
      const response = await axios.post(`${API_URL}/villes`, {       name,
        paysId,
        latitude: parseFloat(latitude), 
        longitude: parseFloat(longitude),
      });
      console.log("Ville ajoutée :", response.data);

      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'ajout de la ville :", error);
      throw error;
    }
  };
  

export const updateVille = async (villeId, name, latitude, longitude) => {
    try {
        console.log('villeId', villeId, 'name', name, 'longitude', longitude, 'latitude', latitude );
        const response = await axios.put(`${API_URL}/villes/${villeId}`, { 
        name,  
        latitude: parseFloat(latitude), 
        longitude: parseFloat(longitude), });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la ville :", error);
        throw error;
    }
}

export const deleteVille = async (villeId) => {
    try {
        const response = await axios.delete(`${API_URL}/villes/${villeId}`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la suppression de la ville :", error);
        throw error;
    }
}

