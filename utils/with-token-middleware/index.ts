import { setContext } from '@apollo/client/link/context';
import cookies from 'js-cookie';

import { verify } from '../jwt';

const withToken = setContext(async () => {
  const authCookie = cookies.get('auth-token') || '';
  console.log('middleware auth cookie', authCookie);
  try {
    await verify(authCookie, 'secret');
    // Return them as part of the context object
    return { authCookie };
  } catch (error) {
    console.log('jwt error', error);
  }
});

export default withToken;
