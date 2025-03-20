const mongoose = require('mongoose');

const PaysSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
  population: { type: Number, default: 0 }

});

module.exports = mongoose.model('Pays', PaysSchema);
