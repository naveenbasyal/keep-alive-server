require('dotenv').config();

const axios = require('axios');

// 5 minutes
const INTERVAL = 300000;

const url = process.env.SERVER_URL
console.log('Pinging server:', url);
if (!url) {
    console.error('SERVER_URL is required');
    process.exit(1);
}
const pingServer = () => {
    axios.get(url)
        .then((response) => {
            console.log('Server is active:', response.status);
            startCountdown();
        })
        .catch((error) => {
            console.error('Error pinging server:', error.message);
            startCountdown();
        });
};

const startCountdown = () => {
    let countdown = INTERVAL / 1000;

    const countdownInterval = setInterval(() => {
        countdown -= 1;
        process.stdout.write(`\rNext ping in ${countdown} seconds`);

        if (countdown <= 0) {
            clearInterval(countdownInterval);
            console.log('\n');
        }
    }, 1000);
};

pingServer();
setInterval(pingServer, INTERVAL);
