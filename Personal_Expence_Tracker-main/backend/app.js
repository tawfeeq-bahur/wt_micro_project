const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
const dotenv = require('dotenv');

dotenv.config(); // load .env file

const app = express();
const PORT = process.env.PORT || 5000; // fallback to 5000 if PORT not defined

// Middleware
app.use(express.json());
app.use(cors());

// Auto-load all routes in 'routes' folder
readdirSync('./routes').map((route) => {
    app.use('/api/v1', require('./routes/' + route));
});

// Start Server
const server = () => {
    db(); // Connect to DB
    app.listen(PORT, () => {
        console.log('✅ Server listening on port:', PORT);
    });
};

server();
