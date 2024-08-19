require('dotenv').config();
const axios = require('axios');
const express = require('express');

const app = express();

// 5 minutes in milliseconds
const INTERVAL = 300000;

const url = process.env.SERVER_URL;
if (!url) {
    console.error('SERVER_URL is required');
    process.exit(1);
}

// Home route
app.get('/', (req, res) => {
    res.send('Keep-Alive Server is running.');
});

const pingServer = async () => {
    try {
        console.log('Pinging server...');
        const response = await axios.get(url);
        console.log('Server is active:', response.status);
        startCountdown();
    } catch (error) {
        console.error('Error pinging server:', error.message);
        startCountdown();
    }
};

const startCountdown = () => {
    let countdown = INTERVAL / 1000;

    const countdownInterval = setInterval(() => {
        process.stdout.write(`\rNext ping in ${countdown} seconds`);

        countdown -= 1;
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            console.log('\n'); // To move to the next line
        }
    }, 1000);
};

// Ping the server immediately and then every 5 minutes
pingServer();
setInterval(pingServer, INTERVAL);

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
