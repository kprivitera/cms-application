'use server';
import { get, map } from 'lodash/fp';
import { getClient } from '../../../../../apollo-client';
import { revalidatePath } from 'next/cache';

import { ADD_CLUB_MEMBER, GET_BOOK_CLUB_BY_ID } from '../../../../../queries';
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
  console.log('book club >>>', bookClub);

  async function create(formData: FormData) {
    'use server';
    // const client = getClient();
    // const name = formData.get('name');
    // const description = formData.get('description');
    // const theme = formData.get('theme');
    console.log('<><>', formData);
  }

  async function onAddUserClick(userId: number) {
    'use server';
    await client.mutate<{ data: unknown }>({
      mutation: ADD_CLUB_MEMBER,
      variables: { input: { bookClubId: parseInt(bookClubId), userId } },
    });
    revalidatePath('/dashboard/book-clubs/4/edit');
  }

  return (
    <div>
      <h1>Edit {bookClub.name}</h1>
      <EditBookClubForm bookClubData={bookClub} onSubmit={create} />

      <ContentWrapper>
        <h2>Current members</h2>
        {map(
          (member) => (
            <ul>
              <li>
                {member.firstName} {member.lastName}
              </li>
            </ul>
          ),
          bookClub.members,
        )}
      </ContentWrapper>

      <ContentWrapper>
        <h2>Add members</h2>
        <MemberSearch userId={userId} onAddUserClick={onAddUserClick} />
      </ContentWrapper>
    </div>
  );
};

export default EditBookClub;
