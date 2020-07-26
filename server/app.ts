import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import fileUploader from 'express-fileupload';
import compression from 'compression';
import session from 'express-session';
import consola from 'consola';
import controllers from './controllers';

const app = express();
const apiRouter = express.Router();

app.use(morgan('dev'));

app.use(compression());

app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SESSION_KEY as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000,
    },
  }),
);

app.use(
  fileUploader({
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  }),
);

controllers(apiRouter);

app.use('/api', apiRouter);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    consola.error(err);
    res.status(500).json(err.message);
  },
);

export default app;
