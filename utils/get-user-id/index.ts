import { cookies } from 'next/headers';
import { get } from 'lodash/fp';

import { verify } from '../jwt';

const getUserId = async () => {
  const cookieStore = cookies();
  const authCookie = cookieStore.get('auth-token') || '';
  const authToken = get('value', authCookie);
  const decryptedJWT = await verify<number>(authToken, 'secret');
  return decryptedJWT.data;
};

export default getUserId;
