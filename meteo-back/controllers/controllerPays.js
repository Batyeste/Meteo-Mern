const axios = require('axios');
const mongoose = require('mongoose');

// controllers/controllerPays.js
const Pays = require('../models/Pays');
const Ville = require('../models/Ville');
const Weather = require('../models/Weather');
const { fetchAndSaveVilles } = require('./controllerVille');
const { fetchWeatherForVilles } = require('./controllerWeather');

async function resetDatabase() {
  try {
    console.log("🔄 Suppression des anciennes données...");
    
    const countPays = await Pays.countDocuments();
    const countVilles = await Ville.countDocuments();
    const countWeather = await Weather.countDocuments();

    console.log(`📊 Nombre de pays avant la suppression : ${countPays}`);
    console.log(`📊 Nombre de villes avant la suppression : ${countVilles}`);
    console.log(`📊 Nombre de météo avant la suppression : ${countWeather}`);

    await Pays.deleteMany({});
    await Ville.deleteMany({});
    await Weather.deleteMany({});
    
    console.log("✅ Base de données réinitialisée !");

    const countPaysAfter = await Pays.countDocuments();
    const countVillesAfter = await Ville.countDocuments();
    const countWeatherAfter = await Weather.countDocuments();

    console.log(`📊 Nombre de pays après la suppression : ${countPaysAfter}`);
    console.log(`📊 Nombre de villes après la suppression : ${countVillesAfter}`);
    console.log(`📊 Nombre de météo après la suppression : ${countWeatherAfter}`);
    
  } catch (error) {
    console.error("❌ Erreur lors de la suppression des données :", error);
  }
}


async function fetchAndSavePays() {
  await resetDatabase();
  console.log("Récupération des pays");
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    const countries = response.data.map(c => ({
      name: c.name.common,
      code: c.cca3,
      population: c.population
    }));

    await Pays.insertMany(countries);
    console.log('Pays insérés avec succès !', countries.length);
    
    // await fetchAndSaveVilles();
    await fetchAndSaveVilles();

    await fetchWeatherForVilles();

  } catch (error) {
    console.error('Erreur lors de la récupération des pays :', error);
  } 
}

fetchAndSavePays();

/** Ajout d'un pays */
async function addPays(req, res) {
  try {
    const { name, code, population } = req.body;
    const pays = new Pays({ name, code, population });
    await pays.save();
    res.status(201).json(pays);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/** Récupère tout les pays */
async function getAllPays(req, res) {
  try {
    const pays = await Pays.find();
    res.json(pays);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/** Met à jour le pays */
async function updatePays(req, res) {
  try {
    const { name, code, population } = req.body;
    const pays = await Pays.findOneAndUpdate({ _id: req.params.paysId }, { name, code, population }, { new: true });
    res.json(pays);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/** Supprime le pays */
async function deletePays(req, res) {
  try {
    await Pays.deleteOne({ _id: req.params.paysId });
    res.json({ message: 'Pays supprimé' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  fetchAndSavePays,
  addPays,
  getAllPays,
  updatePays,
  deletePays
};