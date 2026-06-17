import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/authRoutes';
import resumeRoutes from './routes/resumeRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ResumeShelf API is running",
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'ResumeShelf API is running' });
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

export default app;
