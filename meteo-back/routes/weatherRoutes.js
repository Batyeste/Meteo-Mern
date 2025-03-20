
const express = require('express');
const router = express.Router();
const { addWeather, getWeatherParVille, updateWeather, deleteWeather } = require('../controllers/controllerWeather');

router.post('/weather', addWeather);
router.get('/weather/:villeId', getWeatherParVille);
router.put('/weather/:villeId', updateWeather);
router.delete('/weather/:villeId', deleteWeather);

module.exports = router;
