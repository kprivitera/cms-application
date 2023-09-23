import { cookies } from 'next/headers';
import { get, map } from 'lodash/fp';

import { FriendStatus } from '../../../constants';
import { GET_USER_BY_ID, SEARCH_USERS } from '../../../queries';
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
  console.log('friends route before verify');
  const decryptedJWT = await verify<number>(authToken, 'secret');

  const userId = decryptedJWT.data;

  const client = getClient();
  const searchData = await client.query<{ data: UserData }>({
    query: SEARCH_USERS,
    variables: {
      currentUserId: userId,
      searchTerm: searchTerm,
    },
  });

  const userData = await client.query<{ data: UserData }>({
    query: GET_USER_BY_ID,
    variables: {
      userId,
    },
  });

  const searchUsers = get('data.searchUsers', searchData);
  const currentUser = get('data.user', userData);
  console.log(currentUser);

  return (
    <div>
      <h1>Friends</h1>
      <form action="/dashboard/friends" method="GET">
        <fieldset>
          <legend>User search:</legend>
          <label htmlFor="username">Search: </label>
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
        }, searchUsers)}
      </table>
      <p>Friend requests:</p>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Username</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Accept request</th>
          </tr>
        </thead>
        {map(({ id, username, firstName, lastName, email }) => {
          return (
            <tbody>
              <tr>
                <td>{id}</td>
                <td>{username}</td>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{email}</td>
                <td>
                  <form
                    key={id}
                    action={`/dashboard/friends/accept-friend-request?friendRequestId=${id}`}
                    method="POST"
                  >
                    <button type="submit">Accept</button>
                  </form>
                </td>
              </tr>
            </tbody>
          );
        }, currentUser.receivedFriendRequests)}
      </table>
      <p>Friends:</p>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Username</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
          </tr>
        </thead>
        {map(({ id, username, firstName, lastName, email, friendStatus }) => {
          return (
            <tbody>
              <tr>
                <td>{id}</td>
                <td>{username}</td>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{email}</td>
              </tr>
            </tbody>
          );
        }, currentUser.friends)}
      </table>
    </div>
  );
};

export default Friends;
