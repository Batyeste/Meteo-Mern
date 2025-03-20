const mongoose = require('mongoose');

const WeatherSchema = new mongoose.Schema({
  ville: { type: mongoose.Schema.Types.ObjectId, ref: 'Ville', required: true }, // cle étrangère vers Ville
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  conditions: { type: String, required: true },
  windSpeed: { type: Number, required: true },
  img: { type: String, required: true },
  
}, { timestamps: true });

module.exports = mongoose.model('Weather', WeatherSchema);
