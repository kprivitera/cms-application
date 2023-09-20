import { cookies } from 'next/headers';
import { get, map } from 'lodash/fp';

import { FriendStatus } from '../../../constants';
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
      currentUserId: userId,
      searchTerm: searchTerm,
    },
  });

  const users = get('data.searchUsers', userData);

  return (
    <div>
      <h1>Friends</h1>
      <form action="/dashboard/friends" method="GET">
        <fieldset>
          <label htmlFor="username">Name</label>
          <input id="searchTerm" name="searchTerm" type="text" required />
          <p>
            <button type="submit">Submit</button>
          </p>
        </fieldset>
      </form>
      <p>Users found:</p>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Username</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Send request</th>
          </tr>
        </thead>
        {map(({ id, username, firstName, lastName, email, friendStatus }) => {
          const friendStatusType = FriendStatus[friendStatus];
          return (
            <tbody>
              <tr>
                <td>{id}</td>
                <td>{username}</td>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{email}</td>
                <td>{friendStatusType}</td>
                <td>
                  {friendStatus === 0 && (
                    <form
                      key={id}
                      action={`/dashboard/friends/send-friend-request?userId=${userId}&friendId=${id}`}
                      method="POST"
                    >
                      <button type="submit">Send</button>
                    </form>
                  )}
                </td>
              </tr>
            </tbody>
          );
        }, users)}
      </table>
    </div>
  );
};

export default Friends;
