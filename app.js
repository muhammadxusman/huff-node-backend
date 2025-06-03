const express = require('express');
const { connectDB } = require('./config/db');
const authRoutes = require('./routes/auth'); // <-- Import auth route

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api', authRoutes); // <-- Mount route here

app.get('/', (req, res) => {
  res.send('Server is running!');
});

const startApp = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting the app:', error);
  }
};

startApp();
