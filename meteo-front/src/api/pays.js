import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// router.post('/pays', addPays);
// router.get('/pays', getAllPays);
// router.put('/pays/:paysId', updatePays);
// router.delete('/pays/:paysId', deletePays);


export const getAllPays = async () => {
  try {
      const response = await axios.get(`${API_URL}/pays`);
      return response.data;
  } catch (error) {
      console.error("errer lors de la récupération des pays ; ", error);
      return [];
  }
};

export const addPays = async (name, code, population) => {
  try {
      const response = await axios.post(`${API_URL}/pays`, { name, code, population });
      return response.data;
  } catch (error) {
      console.error("Erreur lors de l'ajout du pays :", error);
      throw error;
  }
}

export const updatePays = async (paysId, name, code, population) => {
  try {
    console.log('paysId', paysId, 'name', name, 'code', code, 'population', population);
      const response = await axios.put(`${API_URL}/pays/${paysId}`, { name, code, population });
      return response.data;
  } catch (error) {
      console.error("Erreur lors de la mise à jour du pays :", error);
      throw error;
  }
}

export const deletePays = async (paysId) => {
  try {
      const response = await axios.delete(`${API_URL}/pays/${paysId}`);
      return response.data;
  } catch (error) {
      console.error("Erreur lors de la suppression du pays :", error);
      throw error;
  }
}