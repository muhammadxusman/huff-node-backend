const express = require('express');
const { connectDB } = require('./config/db');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors(
  {
    origin: 'http://localhost:5173', // Adjust this to your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Allow cookies to be sent
  },
  {
    origin: 'http://172.17.10.70:5173', // Adjust this to your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Allow cookies to be sent
  }
));
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
