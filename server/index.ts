import 'reflect-metadata';
import mongoose from 'mongoose';
import express from 'express';
import consola from 'consola';
import bodyParser from 'body-parser';
import fileUploader from 'express-fileupload';
import compression from 'compression';
import session from 'express-session';
import { redirectToHTTPS } from 'express-http-to-https';
import controllers from './controllers';
import createConnection from './db/connection';

const { Nuxt, Builder } = require('nuxt');

const app = express();
const apiRouter = express.Router();

const config = require('~/nuxt.config.js');

config.dev = !(process.env.NODE_ENV === 'production');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function start() {
  await createConnection;
  const nuxt = new Nuxt(config);

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000,
  } = nuxt.options.server;

  // // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    if (process.env.SECURE_HTTP_CONNECTION) {
      app.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301));
    }
    await nuxt.ready();
  }

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

  app.use(nuxt.render);

  // Listen the server
  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true,
  });
}
start();
