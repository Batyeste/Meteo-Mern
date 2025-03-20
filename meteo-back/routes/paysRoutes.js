// routes/paysRoutes.js
const express = require('express');
const router = express.Router();
const { addPays, getAllPays, updatePays, deletePays } = require('../controllers/controllerPays');

router.post('/pays', addPays);
router.get('/pays', getAllPays);
router.put('/pays/:paysId', updatePays);
router.delete('/pays/:paysId', deletePays);


module.exports = router;
