import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CloudSun,
  Users,
  Edit,
  Trash,
  X,
  Check,
  MoreVertical,
} from "lucide-react";
import { updatePays, deletePays } from "../../api/pays"; 

export default function PaysCard({
  id,
  nom,
  code,
  population,
  onDelete
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  const [formData, setFormData] = useState({
    name: nom, 
    code: code,
    population: population || 0,  
  });

  const populationFormatted = population?.toLocaleString();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "population" ? (value === '' ? 0 : parseInt(value)) : value,
    });
  };

  const handleSubmit = async () => {
    try {
      console.log('Mise à jour du pays:', id, 'avec les données:', formData.name, formData.code, formData.population); 
      await updatePays(id, formData.name, formData.code, formData.population); 
      setIsEditing(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du pays :", error);
    }
  };

  const handleDelete = async () => {
    try {
      setShowDeleteModal(true);
    } catch (error) {
      console.error("Erreur lors de la suppression du pays :", error);
    }
  };

  const confirmDelete = async () => {
    try {
      console.log("Suppression du pays avec l'id:", id);
      await deletePays(id);
      setShowDeleteModal(false);
      // Appel à la fonction onDelete passée en props pour mettre à jour la liste des pays
      if (onDelete) onDelete(id);
    } catch (error) {
      console.error("Erreur lors de la suppression du pays :", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg border border-gray-100 relative">
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
            <button
              onClick={handleDelete}
              className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center text-sm"
            >
              <Trash size={14} className="mr-2 text-red-500" />
              Supprimer
            </button>
          </div>
        )}
      </div>

      {!isEditing ? (
        <Link to={`/pays/${id}/villes`} className="block p-5">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-bold text-gray-800">{nom}</h3>
            {code && (
              <span className="text-sm bg-blue-50 text-blue-600 px-2 py-1 rounded font-medium">
                {code}
              </span>
            )}
          </div>

          <div className="flex items-center text-gray-600 mt-2">
            <CloudSun size={18} className="mr-2 text-blue-500" />
            <span className="text-sm">Voir la météo</span>
          </div>

          {population && (
            <div className="flex items-center mt-3 text-gray-600 border-t border-gray-100 pt-3">
              <Users size={16} className="mr-2" />
              <span className="text-sm font-medium">
                {populationFormatted} habitants
              </span>
            </div>
          )}
        </Link>
      ) : (
        <div className="p-5">
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom
            </label>
            <input
              type="text"
              name="name"  // Changé de nom à name
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Code
            </label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Population
            </label>
            <input
              type="number"
              name="population"
              value={formData.population}
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

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Supprimer le pays</h2>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir supprimer ce pays ? Cette action est
              irréversible.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-100 rounded text-gray-600 hover:bg-gray-200"
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}