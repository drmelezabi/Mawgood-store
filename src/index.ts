import express, { Application, Request, Response } from 'express';
import config from './middleware/config';
import errorHandler from './middleware/error';
import user from './routes';

const app: Application = express();

app.use(express.json());

const PORT = config.SERVER_PORT || 3698;

app.use('/api', user);

// Error handling middleware
app.use(errorHandler);

// this for handling unknown routes
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    message: 'hello from no where!',
  });
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

export default app;
