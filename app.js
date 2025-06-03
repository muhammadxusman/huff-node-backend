const express = require('express');
const { connectDB } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Middleware to parse JSON

app.get('/', (req, res) => {
    res.send('Server is running!');
});

const startApp = async () => {
    try {
        // Connect to the database
        await connectDB();

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error starting the app:', error);
    }
};

startApp();