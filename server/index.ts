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

const dev = !(process.env.NODE_ENV === 'production');

async function start() {
  await createConnection;

  const host = process.env.HOST || '127.0.0.1';
  const port = process.env.PORT || 3000;

  if (!dev) {
    if (process.env.SECURE_HTTP_CONNECTION) {
      app.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301));
    }
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
      res: context.res,
      pubSub,
    }),
  });

  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);
  server.applyMiddleware({ app });

  httpServer.listen(port, () => {
    consola.ready({
      message: `Server listening on http://${host}:${port}`,
      badge: true,
    });
  });
}

start().catch((e) => {
  consola.error(e);
});
