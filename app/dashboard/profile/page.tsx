import { cookies } from 'next/headers';
import { get } from 'lodash/fp';
import type { NextPage } from 'next';

import { GET_USER_BY_ID } from '../../../queries';
import { User } from '../../../types';
import { getClient } from '../../../apollo-client';
import { verify } from '../../../utils/jwt';

type ProfileProps = {
  // userData: User;
};

interface UserData {
  user: User;
}

const Profile: NextPage = async ({}: ProfileProps) => {
  const cookieStore = cookies();
  const authCookie = cookieStore.get('auth-token') || '';
  const authToken = get('value', authCookie);
  const decryptedJWT = await verify<number>(authToken, 'secret');

  const userId = decryptedJWT.data;

  const client = getClient();
  const userData = await client.query<{ data: UserData }>({
    query: GET_USER_BY_ID,
    variables: {
      userId,
    },
  });

  const user = get('data.user', userData);

  return (
    <div>
      <p>First name: {user.firstName}</p>
      <p>Last name: {user.lastName}</p>
      <p>Username: {user.username}</p>
    </div>
  );
};

export default Profile;
