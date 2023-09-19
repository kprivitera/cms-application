import { cookies } from 'next/headers';
import { get, map } from 'lodash/fp';

import { SEARCH_USERS } from '../../../queries';
import { User } from '../../../types';
import { getClient } from '../../../apollo-client';
import { verify } from '../../../utils/jwt';

interface UserData {
  user: User;
}

const Friends = async ({ searchParams }) => {
  const searchTerm = get('searchTerm', searchParams) || '';
  const cookieStore = cookies();
  const authCookie = cookieStore.get('auth-token') || '';
  const authToken = get('value', authCookie);
  const decryptedJWT = await verify<number>(authToken, 'secret');

  const userId = decryptedJWT.data;

  const client = getClient();
  const userData = await client.query<{ data: UserData }>({
    query: SEARCH_USERS,
    variables: {
      searchTerm: searchTerm,
      currentUserId: 2,
    },
  });

  const users = get('data.searchUsers', userData);
  console.log(users);

  return (
    <div>
      <form action="/dashboard/friends" method="GET">
        <label htmlFor="username">Name</label>
        <input id="searchTerm" name="searchTerm" type="text" required />
        <p>
          <button type="submit">Submit</button>
        </p>
      </form>
      <p>Users found:</p>
      {map((user) => {
        return <div>{user.username}</div>;
      }, users)}
    </div>
  );
};

export default Friends;
