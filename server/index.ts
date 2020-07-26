import 'reflect-metadata';
import mongoose from 'mongoose';
import consola from 'consola';
import { redirectToHTTPS } from 'express-http-to-https';
import path from 'path';
import { buildSchema } from 'type-graphql';
import { ApolloServer, PubSub } from 'apollo-server-express';
import http from 'http';
import createConnection from './db/connection';
import CustomAuthChecker from './CustomAuthChecker';
import app from './app';

const { Nuxt, Builder } = require('nuxt');

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

  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    if (process.env.SECURE_HTTP_CONNECTION) {
      app.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301));
    }
    await nuxt.ready();
  }

  const pubSub = new PubSub();

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [path.resolve(__dirname, 'resolvers/**/*')],
      authChecker: CustomAuthChecker,
    }),
    playground: {
      endpoint: '/graphql',
    },
    subscriptions: {
      path: '/subscriptions',
    },
    introspection: true,
    context: (context) => ({
      req: context.req,
      pubSub,
    }),
  });

  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);
  server.applyMiddleware({ app });

  app.use(nuxt.render);

  httpServer.listen(port, () => {
    consola.ready({
      message: `Server listening on http://${host}:${port}`,
      badge: true,
    });
  });
}
start();
