const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const paysRoutes = require('./routes/paysRoutes');
const villeRoutes = require('./routes/villesRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const cors = require('cors'); 

dotenv.config();

const app = express();

connectDB();

app.use(cors()); 
app.use(express.json());

app.use('/api', paysRoutes);
app.use('/api', villeRoutes);
app.use('/api', weatherRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});