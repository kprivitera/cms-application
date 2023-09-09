import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client';
import { NextSSRApolloClient, NextSSRInMemoryCache } from '@apollo/experimental-nextjs-app-support/ssr';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';

import authMiddleware from './utils/apollo-auth-middleware';
import withToken from './utils/with-token-middleware';

export const { getClient } = registerApolloClient(() => {
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: from([withToken, authMiddleware, new HttpLink({ credentials: 'include', uri: 'http://localhost:4000' })]),
  });
});
