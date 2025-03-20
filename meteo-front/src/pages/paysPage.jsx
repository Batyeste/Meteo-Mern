import React, { useState, useEffect } from 'react';
import { fetchPays } from '../api/api';
import Loader from '../components/common/loader';
import ErrorMessage from '../components/common/errorMessage';
import PaysCard from '../components/pays/paysCard';
import { addPays } from "../api/pays"; 
import { Plus, X } from "lucide-react";

export default function PaysPage() {
  const [pays, setPays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPaysData, setNewPaysData] = useState({
    name: '',
    code: '',
    population: ''
  });
  const [addError, setAddError] = useState(null);

  useEffect(() => {
    loadPays();
  }, []);

  const loadPays = async () => {
    try {
      const data = await fetchPays();
      setPays(data);
      setLoading(false);
      console.log('Données reçues:', JSON.stringify(data, null, 2)); 
    } catch (err) {
      setError("Impossible de charger la liste des pays.");
      setLoading(false);
      console.error('Erreur:', err);
    }
  };

  const filteredPays = pays.filter(pays => 
    pays.name && typeof pays.name === 'string' && pays.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPaysData({
      ...newPaysData,
      [name]: name === "population" ? (value === '' ? '' : parseInt(value)) : value,
    });
  };

  const handleAddPays = async (e) => {
    e.preventDefault();
    
    if (!newPaysData.name || !newPaysData.code) {
      setAddError("Le nom et le code du pays sont obligatoires.");
      return;
    }
    
    try {
      const population = newPaysData.population === '' ? 0 : newPaysData.population;
      const newPays = await addPays(newPaysData.name, newPaysData.code, population);
      
      setPays([...pays, newPays]);
      setShowAddModal(false);
      setNewPaysData({ name: '', code: '', population: '' });
      setAddError(null);
    } catch (err) {
      setAddError("Erreur lors de l'ajout du pays. Veuillez réessayer.");
      console.error('Erreur lors de l\'ajout:', err);
    }
  };

  const handleDeletePays = (id) => {
    setPays(pays.filter(p => p._id !== id));
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Liste des Pays</h1>
        <button 
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          <Plus size={16} />
          Ajouter un pays
        </button>
      </div>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Rechercher un pays..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:max-w-md p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPays.length > 0 ? (
          filteredPays.map(pays => (
            <PaysCard
              key={pays._id}
              id={pays._id}
              nom={pays.name}
              code={pays.code}
              population={pays.population}
              onDelete={handleDeletePays}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">Aucun pays ne correspond à votre recherche.</p>
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-[90%]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Ajouter un nouveau pays</h2>
              <button 
                onClick={() => {
                  setShowAddModal(false);
                  setAddError(null);
                  setNewPaysData({ name: '', code: '', population: '' });
                }}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
            
            {addError && (
              <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">
                {addError}
              </div>
            )}
            
            <form onSubmit={handleAddPays}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du pays*
                </label>
                <input
                  type="text"
                  name="name"
                  value={newPaysData.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Code du pays*
                </label>
                <input
                  type="text"
                  name="code"
                  value={newPaysData.code}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                  placeholder="ex: FR, US, JP"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Population
                </label>
                <input
                  type="number"
                  name="population"
                  value={newPaysData.population}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Optionnel"
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setAddError(null);
                    setNewPaysData({ name: '', code: '', population: '' });
                  }}
                  className="px-4 py-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}