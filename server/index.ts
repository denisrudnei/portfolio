import 'reflect-metadata';

import { ApolloServer, PubSub } from 'apollo-server-express';
import consola from 'consola';
import { redirectToHTTPS } from 'express-http-to-https';
import http from 'http';
import path from 'path';
import { buildSchema } from 'type-graphql';

import app from './app';
import CustomAuthChecker from './CustomAuthChecker';
import createConnection from './db/connection';

const { Nuxt, Builder } = require('nuxt');

const config = require('~/nuxt.config.js');

config.dev = !(process.env.NODE_ENV === 'production');

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
      pubSub,
    }),
    playground: {
      endpoint: '/graphql',
    },
    subscriptions: {
      path: '/subscriptions',
      keepAlive: 10000,
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
