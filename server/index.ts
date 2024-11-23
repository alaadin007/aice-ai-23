import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { analyzeExpertiseRouter } from './routes/analyzeExpertise';
import { config } from './config';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/analyze', analyzeExpertiseRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});