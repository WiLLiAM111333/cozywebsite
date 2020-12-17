import express from 'express';
import { Constants } from '../utils/constants';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';  
import { AuthRouter } from './api/routes/index';

const app = express();

app.use(helmet());

app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200
}));

app.use(morgan('dev'));

const authRouter = new AuthRouter(app);

app.use(authRouter.route, authRouter.router);

app.get('/', (req, res) => res.status(200).json({ message: Constants.API_MESSAGE }));

export { app };
