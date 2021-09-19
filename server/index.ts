import 'reflect-metadata';

import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import consola from 'consola';
import { redirectToHTTPS } from 'express-http-to-https';
import { execute, subscribe } from 'graphql';
import { PubSub } from 'graphql-subscriptions';
import http from 'http';
import path from 'path';
import { SubscriptionServer } from 'subscriptions-transport-ws';
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

  const schema = await buildSchema({
    resolvers: [path.resolve(__dirname, 'resolvers/**/*')],
    authChecker: CustomAuthChecker,
    pubSub,
  });

  const httpServer = http.createServer(app);

  const subscriptionServer = SubscriptionServer.create({
    schema,
    execute,
    subscribe,
  }, {
    server: httpServer,
    path: '/subscriptions',
  });

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
    introspection: true,
    context: (context) => ({
      req: context.req,
      res: context.res,
      pubSub,
    }),
  });

  await server.start();

  server.applyMiddleware({ app, path: '/graphql', cors: false });

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
