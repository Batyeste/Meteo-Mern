// routes/paysRoutes.js
const express = require('express');
const router = express.Router();
const { addVille, getVillesParPays, updateVille, deleteVille } = require('../controllers/controllerVille');

router.post('/villes', addVille);
router.get('/villes/:paysId', getVillesParPays);
router.put('/villes/:villeId', updateVille);
router.delete('/villes/:villeId', deleteVille);

module.exports = router;
