const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// 1. Imports sahi hone chahiye
const categoryRoutes = require('./routes/categoryRoutes');
const articleRoutes = require('./routes/articleRoutes');

const app = express();

// 2. Middlewares (Must be BEFORE routes)
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json()); // Ye missing hua toh data nahi milega

// 3. Routes Mount
app.use('/api/categories', categoryRoutes);
app.use('/api/articles', articleRoutes);

// 4. Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP' });
});

module.exports = app;