const mongoose = require('mongoose');

const VilleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  pays: { type: mongoose.Schema.Types.ObjectId, ref: 'Pays', required: true }, // cle étrangère vers Pays
  longitude: { type: Number, required: true },
  latitude: { type: Number, required: true },
});

module.exports = mongoose.model('Ville', VilleSchema);
