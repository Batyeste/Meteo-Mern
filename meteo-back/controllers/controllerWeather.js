// controllers/controllerWeather.js
const axios = require("axios");
const Weather = require("../models/Weather");
const Ville = require("../models/Ville");

async function fetchWeatherForVilles() {
  console.log("Récupération de la météo pour toutes les villes...");
  const villes = await Ville.find();
  console.log(`Nombre de villes à traiter: ${villes.length}`);

  for (const ville of villes) {
    console.log(`Récupération de la météo pour ${ville.name}`);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            q: ville.name,
            appid: process.env.API_KEY_OW,
          },
        }
      );

      const { temp, humidity } = response.data.main;
      const windSpeed = response.data.wind.speed;
      const conditions = response.data.weather[0]?.description || "Unknown";
      const img = response.data.weather[0]?.icon || "01d";
      
      await Weather.create({
        ville: ville._id,
        temperature: temp,
        humidity: humidity,  
        windSpeed: windSpeed,
        conditions: conditions, 
        img: `https://openweathermap.org/img/wn/${img}@2x.png`
      });
      
      console.log(`Météo insérée pour ${ville.name}`);
    } catch (error) {
      console.error(
        `❌ Erreur pour la ville ${ville.name}:`,
        error.response?.data || error.message
      );
    }
  }
}


/** Ajout d'une météo */
async function addWeather(req, res) {
  try {
    const { ville, temperature, humidity, conditions, windSpeed, img } = req.body;
    const weather = new Weather({ ville, temperature, humidity, conditions, windSpeed, img });
    await weather.save();
    res.status(201).json(weather);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/** Récupère tout les météos pour une ville */
// controllerWeather.js
async function getWeatherParVille(req, res) {
  try {
    // console.log('req.params.villeId', req.params.villeId);
    const weatherData = await Weather.find({ ville: req.params.villeId });

    if (weatherData.length === 0) {
      return res.status(404).json({ message: "Aucune donnée météo trouvée pour cette ville" });
    }

    const ville = await Ville.findById(req.params.villeId).populate('pays');
    if (!ville) {
      return res.status(404).json({ message: "Ville non trouvée" });
    }
    const response = {
      villeId: ville._id,
      ville: ville.name,
      pays: ville.pays.name,
      paysId: ville.pays._id,
      current: {
        longitude: ville.longitude,
        latitude: ville.latitude,
        weatherId: weatherData[0]._id,
        temperature: weatherData[0].temperature,
        humidity: weatherData[0].humidity,
        conditions: weatherData[0].conditions,
        windSpeed: weatherData[0].windSpeed,
        img: weatherData[0].img
      },
      forecast: weatherData.slice(1).map(item => ({
        date: item.createdAt.toISOString().split('T')[0],
        temperature: item.temperature,
        humidity: item.humidity,
        conditions: item.conditions,
        windSpeed: item.windSpeed,
        img: item.img
      }))
    };

    console.log('response', response);
    res.json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

/** Met à jour la météo pour la ville */
async function updateWeather(req, res) {
  try {
    console.log('req.params.villeId', req.params.villeId);
    console.log('données reçu req.body', req.body);

    const { temperature, humidity, conditions, windSpeed } = req.body;

    const weather = await Weather.findOneAndUpdate(
      { ville: req.params.villeId },
      { temperature, humidity, conditions, windSpeed },
      { new: true }
    );

    console.log("weather", weather);
    res.json(weather);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

/** Supprime la météo pour la ville */
async function deleteWeather(req, res) {
  try {
    await Weather.deleteOne({ ville: req.params.villeId });
    res.json({ message: "Weather supprimé" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}


module.exports = {
  fetchWeatherForVilles,
  addWeather,
  getWeatherParVille,
  updateWeather,
  deleteWeather,
};