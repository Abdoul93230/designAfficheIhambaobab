import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { designRoutes } from './routes/designs.js';
import { scheduleRoutes } from './routes/schedules.js';
import { authRoutes, authMiddleware } from './routes/auth.js';
import { User } from './models/User.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/designs', authMiddleware, designRoutes);
app.use('/api/schedules', authMiddleware, scheduleRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ad-platform')
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Créer un utilisateur par défaut
    try {
      const defaultUser = await User.findOne({ email: 'admin@example.com' });
      if (!defaultUser) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await User.create({
          email: 'admin@example.com',
          password: hashedPassword,
          name: 'Admin'
        });
        console.log('Default user created');
      }
    } catch (error) {
      console.error('Error creating default user:', error);
    }
  })
  .catch((error) => console.error('MongoDB connection error:', error));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});