import { cookies } from 'next/headers';
import { get } from 'lodash/fp';
import { setContext } from '@apollo/client/link/context';

import { verify } from '../jwt';

const withToken = setContext(async () => {
  const cookieStore = cookies();
  const authCookie = cookieStore.get('auth-token') || '';
  const authCookieValue = get('value', authCookie);
  console.log('withToken: middleware auth cookie', authCookieValue);
  try {
    await verify(authCookieValue, 'secret');
    // Return them as part of the context object
    return { authCookie };
  } catch (error) {
    console.log('jwt error', error);
  }
});

export default withToken;
