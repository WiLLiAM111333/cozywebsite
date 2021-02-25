import express, { Request } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';  
import session from 'express-session';
import KnexSessionStoreFN from 'connect-session-knex';
import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';
import { APIRouter } from './api/routes/index';
import { Constants } from '../utils/constants';
import { db } from '../db';
import { v4 as uuidv4 } from 'uuid';

const app = express();

const KnexSessionStore = KnexSessionStoreFN(session);
const apiRouter = new APIRouter(app);

app.use(apiRouter.route, apiRouter.router);
app.use(helmet());
app.use(morgan('dev'));

app.use(session({
  secret: 'keyboard cat',
  genid: (req: Request): string => uuidv4(),
  store: new KnexSessionStore({
    knex: db,
    createtable: true,
    tablename: 'sessions',
    sidfieldname: 'session_id',
    clearInterval: 35000 // 35 seconds for testing
  }),
  cookie: {
    maxAge: 30000 // 30 seconds for testing
  },
  resave: false,
  saveUninitialized: true
}));

app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  headers: true,
  message: JSON.stringify({ message: 'Woah buddy slow down, you\'re going too fast!' }),
  skipFailedRequests: true
}));

app.use(slowDown({
  windowMs: 2 * 60 * 1000, // 2 minutes
  delayAfter: 100,
  delayMs: 500
}));

app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200
}));

app.get('/', (req, res) => {
  res.status(200).json({ message: Constants.API_MESSAGE })
});

export { app };
