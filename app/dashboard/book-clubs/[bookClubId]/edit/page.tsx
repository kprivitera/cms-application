'use server';
import { get, map } from 'lodash/fp';
import { getClient } from '../../../../../apollo-client';

import { GET_BOOK_CLUB_BY_ID } from '../../../../../queries';
import Button from '../../../../../components/button';
import ContentWrapper from '../../../../../components/content-wrapper';
import EditBookClubForm from './components/edit-form';
import MemberSearch from '../../../../../components/member-search';
import getUserId from '../../../../../utils/get-user-id';

const EditBookClub = async ({ params }) => {
  const userId = await getUserId();
  const bookClubId = get('bookClubId', params);
  const client = getClient();
  const bookClubData = await client.query<{ data: unknown }>({
    query: GET_BOOK_CLUB_BY_ID,
    variables: { bookClubId },
  });
  const bookClub = get('data.bookClub', bookClubData);
  // console.log(bookClub);
  return (
    <div>
      <h1>Edit {bookClub.name}</h1>
      <EditBookClubForm bookClubData={bookClub} />

      <ContentWrapper>
        <h2>Current members</h2>
        {map(
          (member) => (
            <ul>
              <li className="grid grid-cols-4 gap-4 mb-2">
                <div className="col-span-1 self-center">
                  {member.firstName} {member.lastName}
                </div>
                <form
                  className="col-span-3"
                  key={member.id}
                  action={`/dashboard/book-clubs/remove-member?memberId=${member.id}&bookClubId=${bookClubId}`}
                  method="POST"
                >
                  <Button>Remove</Button>
                </form>
              </li>
            </ul>
          ),
          bookClub.members,
        )}
      </ContentWrapper>

      <ContentWrapper>
        <h2>Club books</h2>
        {map(
          (book) => (
            <ul>
              <li className="grid grid-cols-4 gap-4 mb-2">
                <div className="col-span-1 self-center">Title: {book.title}</div>
                <form
                  className="col-span-3"
                  key={book.id}
                  action={`/dashboard/book-clubs/remove-book?bookId=${book.id}&bookClubId=${bookClubId}`}
                  method="POST"
                >
                  <Button>Remove</Button>
                </form>
              </li>
            </ul>
          ),
          bookClub.books,
        )}
      </ContentWrapper>

      <ContentWrapper>
        <h2>Add members</h2>
        <MemberSearch bookClubId={bookClubId} userId={userId} />
      </ContentWrapper>
    </div>
  );
};

export default EditBookClub;
