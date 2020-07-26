/* eslint-disable no-param-reassign */
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import Vue from 'vue';
import VueApollo from 'vue-apollo';
import 'node-fetch';
import consola from 'consola';
import ws from 'ws';

export default ({ app, req }: any, inject: any) => {
  const url = {
    protocol: process.client ? window.location.protocol.replace(':', '') : req.protocol,
    host: process.client ? window.location.host : req.headers.host,
  };

  consola.info(`url for graphql: ${url.protocol}://${url.host}/graphql`);

  const wsOrWss = url.protocol.includes('https') ? 'wss://' : 'ws://';

  const httpLink = createHttpLink({
    fetch,
    credentials: 'include',
    uri: `${url.protocol}://${url.host}/graphql`,
  });

  const wsLink = new WebSocketLink({
    uri: `${wsOrWss}${url.host}/subscriptions`,
    options: {
      reconnect: true,
    },
    ...(process.server ? { webSocketImpl: ws } : undefined),
  });

  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition'
        && definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );

  const cache = new InMemoryCache();

  const apolloClient = new ApolloClient({
    link,
    connectToDevTools: true,
    cache,
    ssrMode: process.server,
  });

  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
  });

  Vue.use(VueApollo);

  Vue.prototype.$apolloProvider = apolloProvider;
  app.$apollo = apolloProvider.defaultClient;
};
