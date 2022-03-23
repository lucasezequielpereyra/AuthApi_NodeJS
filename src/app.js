import express from 'express';
import morgan from 'morgan';
import pkg from '../package.json';

import authRoutes from './routes/auth.routes';
import usersRoutes from './routes/user.routes';
import { createRoles } from './libs/initialSetup';
import cors from 'cors';

const app = express();
createRoles(); // initial config

app.set('pkg', pkg);

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json({
    name: app.get('pkg').name,
    author: app.get('pkg').author,
    description: app.get('pkg').description,
    version: app.get('pkg').version,
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/user', usersRoutes);

app.get('*', (req, res) => {
  res.status(404);
  res.send({ error: 'Not found' });
});

export default app;
