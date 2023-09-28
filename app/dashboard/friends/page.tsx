import { camelCase, get, map } from 'lodash/fp';
import { cookies } from 'next/headers';

import { FriendStatus } from '../../../constants';
import { GET_USER_BY_ID, SEARCH_USERS } from '../../../queries';
import { User } from '../../../types';
import { getClient } from '../../../apollo-client';
import { verify } from '../../../utils/jwt';
import Button from '../../../components/button';
import ContentWrapper from '../../../components/content-wrapper';
import Input from '../../../components/input';
import Table from '../../../components/table';

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
  const friendsFields = ['username', 'first name', 'last name', 'email'];
  return (
    <div>
      <h1>Friends</h1>
      <ContentWrapper>
        <form action="/dashboard/friends" method="GET">
          <fieldset>
            {/* <legend>User search:</legend> */}
            {/* <label htmlFor="username">Search: </label> */}
            <Input id="searchTerm" name="searchTerm" type="text" placeholder="Search user" required />
            <p>
              <Button>Submit</Button>
            </p>
          </fieldset>
        </form>
      </ContentWrapper>
      <ContentWrapper>
        <h2>Users found:</h2>
        <Table
          theadData={[...friendsFields, 'friend status', 'send request']}
          tbodyData={map((friend) => {
            const items = friendsFields.map((item) => friend[camelCase(item)]);
            const friendStatusType = FriendStatus[friend.friendStatus];

            return {
              id: friend.id,
              items: [
                ...items,
                friendStatusType,
                friend.friendStatus === 0 && (
                  <form
                    key={friend.id}
                    action={`/dashboard/friends/send-friend-request?userId=${userId}&friendId=${friend.id}`}
                    method="POST"
                  >
                    <Button>Send</Button>
                  </form>
                ),
              ],
            };
          }, searchUsers)}
        />
      </ContentWrapper>
      <ContentWrapper>
        <h2>Friend requests:</h2>
        <Table
          theadData={[...friendsFields, 'accept request']}
          tbodyData={map((friend) => {
            const items = friendsFields.map((item) => friend[camelCase(item)]);
            return {
              id: friend.id,
              items: [
                ...items,
                <form
                  key={friend.id}
                  action={`/dashboard/friends/accept-friend-request?friendRequestId=${friend.id}`}
                  method="POST"
                >
                  <Button>Accept</Button>
                </form>,
              ],
            };
          }, currentUser.receivedFriendRequests)}
        />
      </ContentWrapper>
      <ContentWrapper>
        <h2>Friends:</h2>
        <Table
          theadData={friendsFields}
          tbodyData={map(
            (friend) => ({
              id: friend.id,
              items: friendsFields.map((item) => friend[camelCase(item)]),
            }),
            currentUser.friends,
          )}
        />
      </ContentWrapper>
    </div>
  );
};

export default Friends;
