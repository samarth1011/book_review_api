const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes); // Authentication routes for signup and login
app.use('/api/books', bookRoutes);
app.use('/api', reviewRoutes);


module.exports = app;

