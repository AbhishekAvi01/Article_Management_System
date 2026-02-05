const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');


const categoryRoutes = require('./routes/categoryRoutes');
const articleRoutes = require('./routes/articleRoutes');

const app = express();


app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json()); 


app.use('/api/categories', categoryRoutes);
app.use('/api/articles', articleRoutes);


app.get('/', (req, res) => {
    res.send(`
        <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 100px;">
            <h1 style="color: #2c3e50;"> Article API is Running!</h1>
            <p style="color: #7f8c8d;">The backend for your dynamic article app is live and healthy.</p>
            <div style="margin-top: 20px;">
                <a href="/health" style="background: #3498db; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Check Server Health</a>
            </div>
        </div>
    `);
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP' });
});

module.exports = app;