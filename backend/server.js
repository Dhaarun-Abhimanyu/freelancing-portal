const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const sequelize = require('./config/db');
require('dotenv').config();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

const authRoutes = require('./routes/authRoutes');
const employerRoutes = require('./routes/employerRoutes');
const freelancerRoutes = require('./routes/freelancerRoutes');

app.use(cors({
  origin: true, 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

app.use(express.json());
app.use(cookieParser());

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Freelancing Portal API',
      version: '1.0.0',
      description: 'API documentation for the Freelancing Portal'
    },
    servers: [
      { url: 'http://localhost:' + (process.env.PORT || 5000) }
    ],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer' }
      }
    }
  },
  apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/auth', authRoutes);
app.use('/api/employer', employerRoutes);
app.use('/api/freelancer', freelancerRoutes);

sequelize.sync({ alter: true }).then(() => console.log('Database synced successfully'));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Test Home Route' });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT || 5000}`);
});

