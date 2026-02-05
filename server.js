const app = require('./src/app');
const connectDB = require('./src/config/db');
const dotenv = require('dotenv');

// 1. Load Environment Variables (.env file se variables read karne ke liye)
dotenv.config();

// 2. Connect to Database (Pehle DB connect hoga, phir server start hoga)
connectDB();

const PORT = process.env.PORT || 5000;

// 3. Start the Express Server
const server = app.listen(PORT, () => {
    console.log(`
🚀 Server is running!
📡 Port: ${PORT}
 environment: ${process.env.NODE_ENV || 'development'}
    `);
});

// 4. Handle Unhandled Promise Rejections (Professional Error Guard)
// Agar database connection fail ho jaye ya koi aisi error aaye jo humne handle na ki ho,
// toh ye code server ko crash hone se bachayega aur safely band karega.
process.on('unhandledRejection', (err, promise) => {
    console.log(`❌ Error: ${err.message}`);
    // Server close karke process ko exit karenge
    server.close(() => process.exit(1));
});

// 5. Handle SIGTERM (For Production Platforms like Heroku/Docker)
process.on('SIGTERM', () => {
    console.log('👋 SIGTERM received. Shutting down gracefully');
    server.close(() => {
        console.log('💥 Process terminated!');
    });
});