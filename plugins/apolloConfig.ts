/* eslint-disable no-param-reassign */
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Vue from 'vue';
import VueApollo from 'vue-apollo';
import 'cross-fetch/polyfill';

export default ({ app, req }: any, inject: any) => {
  const url = {
    protocol: process.client ? window.location.protocol.replace(':', '') : req.protocol,
    host: process.client ? window.location.host : req.headers.host,
  };

  const httpLink = createHttpLink({
    fetch,
    uri: `${url.protocol}://${url.host}/graphql`,
  });

  const cache = new InMemoryCache({
    addTypename: false,
  });

  const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
  });

  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
  });

  Vue.use(VueApollo);

  Vue.prototype.$apolloProvider = apolloProvider;
  app.$apollo = apolloProvider.defaultClient;
};
