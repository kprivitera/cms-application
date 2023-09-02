import { ApolloLink } from '@apollo/client';

const authMiddleware = new ApolloLink((operation, forward) => {
  const { authCookie } = operation.getContext();

  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => {
    return {
      headers: {
        ...headers,
        'x-access-token': authCookie || null,
      },
    };
  });
  return forward(operation);
});

export default authMiddleware;
