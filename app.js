const express = require('express');
const { connectDB } = require('./config/db');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running!');
});
const userRoutes = require('./routes/user');
app.use('/api', userRoutes);

const authRoutes = require('./routes/auth'); 
app.use('/api', authRoutes);  


const trainerRoutes = require('./routes/coachesClassesRoutes');
app.use('/api', trainerRoutes);


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
