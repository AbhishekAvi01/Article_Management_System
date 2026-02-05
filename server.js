const app = require('./src/app');
const connectDB = require('./src/config/db');
const dotenv = require('dotenv');


dotenv.config();


connectDB();

const PORT = process.env.PORT || 5000;


const server = app.listen(PORT, () => {
    console.log(`
    Server is running!
    Port: ${PORT}
 environment: ${process.env.NODE_ENV || 'development'}
    `);
});

process.on('unhandledRejection', (err, promise) => {
    console.log(` Error: ${err.message}`);
    
    server.close(() => process.exit(1));
});


process.on('SIGTERM', () => {
    console.log(' SIGTERM received. Shutting down gracefully');
    server.close(() => {
        console.log(' Process terminated!');
    });
});