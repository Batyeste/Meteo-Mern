const axios = require('axios');
const mongoose = require('mongoose');
const Ville = require('../models/Ville');
const Pays = require('../models/Pays');
// const { fetchWeatherForVilles } = require('./controllerWeather');

async function fetchAndSaveVilles() {
  try {
    console.log("Récupération des capitales");
    
    const response = await axios.get('https://restcountries.com/v3.1/all');
    const countries = response.data;

    for (const country of countries) {
      if (!country.capital || country.capital.length === 0) continue;

      const pays = await Pays.findOne({ code: country.cca3 });

      if (!pays) {
        // console.warn(`Pays non trouvé pour la capitale ${country.capital[0]} (${country.cca3})`);
        continue;
      }

      const villeExiste = await Ville.findOne({ name: country.capital[0], pays: pays._id });
      if (villeExiste) {
        // console.log(`Capitale déjà en DB : ${country.capital[0]}`);
        continue;
      }

      await Ville.create({
        name: country.capital[0],
        pays: pays._id,
        latitude: country.latlng[0], 
        longitude: country.latlng[1]
      });

      // console.log(`Capitale ajoutée : ${country.capital[0]} (Pays: ${pays.name})`);
    }

    console.log('les capitales ont été insérées correctement !');
    // await fetchWeatherForVilles();

  } catch (error) {
    console.error('erreur de la récupération des capitales :', error);
  } 
}


async function addVille(req, res) {
  try {
    let { name, paysId, latitude, longitude } = req.body;

    // Vérifier si paysId est un ObjectId valide
    if (!mongoose.Types.ObjectId.isValid(paysId)) {
      return res.status(400).json({ message: "ID du pays invalide" });
    }

    // Vérifier si le pays existe
    const pays = await Pays.findById(paysId);
    if (!pays) {
      return res.status(404).json({ message: "Pays non trouvé" });
    }

    // Vérifier si la ville existe déjà pour ce pays
    const villeExiste = await Ville.findOne({ name, pays: paysId });
    if (villeExiste) {
      return res.status(400).json({ message: "Cette ville existe déjà dans ce pays" });
    }

    // Convertir latitude et longitude en nombres
    latitude = parseFloat(latitude);
    longitude = parseFloat(longitude);

    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({ message: "Latitude ou longitude invalide" });
    }

    // Créer et sauvegarder la ville
    const ville = new Ville({ name, pays: paysId, latitude, longitude });
    await ville.save();

    res.status(201).json(ville);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
}



/** Récupere tout les villes pour un pays */
async function getVillesParPays(req, res) {
  try {
    const villes = await Ville.find({ pays: req.params.paysId });
    res.json(villes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/** Met à jour la ville */
async function updateVille(req, res) {
  try {
    // console.log("Données reçues:", req.body);
    const { name, latitude, longitude } = req.body;
    
    // Vérifiez que latitude et longitude sont bien définis
    if (latitude === undefined || longitude === undefined) {
      return res.status(400).json({ message: "Latitude et longitude sont requis" });
    }

    const ville = await Ville.findOneAndUpdate(
      { _id: req.params.villeId },
      { name, latitude, longitude },
      { new: true }
    );
    
    if (!ville) {
      return res.status(404).json({ message: "Ville non trouvée" });
    }

    res.json(ville);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

/** Supprime la ville */
async function deleteVille(req, res) {
  try {
    await Ville.deleteOne({ _id: req.params.villeId });
    res.json({ message: "Ville supprimée" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  fetchAndSaveVilles,
  addVille,
  getVillesParPays,
  updateVille,
  deleteVille
};