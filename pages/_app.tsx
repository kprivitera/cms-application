import '../styles/globals.css';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, from } from '@apollo/client';
import { ThemeProvider } from 'styled-components';

import { GlobalStyles, lightTheme } from '../styles/theme.config';
import ContentWrapper from '../components/content-wrapper';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import authMiddleware from '../utils/apollo-auth-middleware';
import withToken from '../utils/with-token-middleware';
import type { AppProps } from 'next/app';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([withToken, authMiddleware, new HttpLink({ credentials: 'include', uri: 'http://localhost:4000' })]),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <ApolloProvider client={client}>
        <Header />
        <Sidebar />
        <ContentWrapper>
          <Component {...pageProps} />
        </ContentWrapper>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default MyApp;
