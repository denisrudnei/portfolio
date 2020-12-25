import bodyParser from 'body-parser';
import compression from 'compression';
import consola from 'consola';
import express from 'express';
import fileUploader from 'express-fileupload';
import session from 'express-session';
import morgan from 'morgan';
import cors from 'cors';

import controllers from './controllers';

const app = express();
const apiRouter = express.Router();

app.use(cors());

app.use(morgan('dev'));

app.use(compression());

app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SESSION_KEY as string,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(
  fileUploader({
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  }),
);

apiRouter.use(controllers);

app.use('/', apiRouter);

app.use((
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  consola.error(err);
  if (res.headersSent) {
    return next(err);
  }
  const { status } = err;
  return res.status(status).json(err.message);
});

export default app;
