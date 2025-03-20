import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchVillesByPays, fetchPays } from "../api/api";
import addVille from "../api/villes";
import Loader from "../components/common/loader";
import ErrorMessage from "../components/common/errorMessage";
import VilleCard from "../components/villes/villeCard";
import { Plus, X } from "lucide-react";

export default function VillePage() {
  const { paysId } = useParams();
  const [villes, setVilles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [paysInfo, setPaysInfo] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [paysList, setPaysList] = useState([]);
  const [newVilleData, setNewVilleData] = useState({ name: "", latitude: "", longitude: "", paysId: paysId || "" });
  const [addError, setAddError] = useState(null);

  useEffect(() => {
    const loadVilles = async () => {
      try {
        const data = await fetchVillesByPays(paysId);
        setVilles(Array.isArray(data) ? data : []);
        setPaysInfo({});
        setLoading(false);
      } catch (err) {
        setError("Impossible de charger la liste des villes pour ce pays.");
        setLoading(false);
      }
    };
    
    const loadPays = async () => {
      try {
        const paysData = await fetchPays();
        setPaysList(paysData);
      } catch (err) {
        console.error("Erreur lors du chargement des pays", err);
      }
    };

    loadVilles();
    loadPays();
  }, [paysId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVilleData({ ...newVilleData, [name]: value });
  };

  const handleAddVille = async (e) => {
    e.preventDefault();
    if (!newVilleData.name || !newVilleData.paysId) {
      setAddError("Le nom et le pays sont obligatoires.");
      return;
    }
    try {
      const newVille = await addVille(newVilleData.name, newVilleData.paysId, newVilleData.latitude, newVilleData.longitude);
      setVilles([...villes, newVille]);
      setShowAddModal(false);
      setNewVilleData({ name: "", latitude: "", longitude: "", paysId: paysId || "" });
      setAddError(null);
    } catch (err) {
      setAddError("Erreur lors de l'ajout de la ville. Veuillez réessayer.");
      console.error("Erreur lors de l'ajout:", err);
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Villes de {paysInfo?.nom || "ce pays"}</h1>
        <button onClick={() => setShowAddModal(true)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2">
          <Plus size={16} /> Ajouter une ville
        </button>
      </div>

      <input type="text" placeholder="Rechercher une ville..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full md:max-w-md p-3 border border-gray-300 rounded-lg focus:outline-none" />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {villes.length > 0 ? villes.map((ville) => <VilleCard id={ville.id} ville={ville} />) : <p className="col-span-full text-center text-gray-500">Aucune ville trouvée.</p>}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-[90%]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Ajouter une ville</h2>
              <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-gray-100 rounded-full"><X size={20} /></button>
            </div>
            {addError && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">{addError}</div>}
            <form onSubmit={handleAddVille}>
              <label>Nom de la ville*</label>
              <input type="text" name="name" value={newVilleData.name} onChange={handleInputChange} className="w-full border rounded px-3 py-2" required />
              <label>Pays*</label>
              <select name="paysId" value={newVilleData.paysId} onChange={handleInputChange} className="w-full border rounded px-3 py-2" required>
                <option value="">Sélectionner un pays</option>
                {paysList.map((p) => (
                  <option key={p._id} value={p._id}>{p.name}</option>
                ))}
              </select>
              <label>Latitude</label>
              <input type="text" name="latitude" value={newVilleData.latitude} onChange={handleInputChange} className="w-full border rounded px-3 py-2" />
              <label>Longitude</label>
              <input type="text" name="longitude" value={newVilleData.longitude} onChange={handleInputChange} className="w-full border rounded px-3 py-2" />
              <div className="flex justify-end space-x-3 mt-4">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200">Annuler</button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Ajouter</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
