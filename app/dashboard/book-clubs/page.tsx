import { GET_USERS_BOOK_CLUBS } from '../../../queries';
import { get, map } from 'lodash/fp';
import { getClient } from '../../../apollo-client';
import ContentWrapper from '../../../components/content-wrapper';
import LinkButton from '../../../components/link-button';
import getUserId from '../../../utils/get-user-id';

const BookClubs = async () => {
  const userId = await getUserId();
  const client = getClient();
  const usersBookClubData = await client.query<{ data: unknown }>({
    query: GET_USERS_BOOK_CLUBS,
    variables: { userId },
  });

  const user = get('data.user', usersBookClubData);
  const usersBookClubs = get('bookClubs', user);
  console.log(user);
  return (
    <div>
      <h1>Book clubs</h1>
      <ContentWrapper>
        <h2>{user.firstName}&apos;s book clubs</h2>
        {map(({ id, name, description }) => {
          return (
            <div>
              <div>
                {name} <a href={`/dashboard/book-clubs/${id}/edit`}>Edit</a>
              </div>
            </div>
          );
        }, usersBookClubs)}
      </ContentWrapper>
      <LinkButton href="/dashboard/book-clubs/create">Create book club</LinkButton>
    </div>
  );
};

export default BookClubs;
