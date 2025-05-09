const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const sequelize = require('./config/db');
require('dotenv').config();

const app = express();

const authRoutes = require('./routes/authRoutes');

app.use(cors({
  origin: true, // Allow all origins (equivalent to '*')
  credentials: true, // Allow cookies to be sent with requests
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);

sequelize.sync({ alter: true }).then(() => console.log('Database synced successfully'));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Test Home Route' });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT || 5000}`);
});
