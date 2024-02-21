import { get } from 'lodash/fp';
import { getClient } from '../../../../apollo-client';
import { redirect } from 'next/navigation';

import { CREATE_BOOK_CLUB } from '../../../../queries';
import Button from '../../../../components/button';
import ContentWrapper from '../../../../components/content-wrapper';
import Field from '../../../../components/field';

const CreateBookClubs = async () => {
  async function create(formData: FormData) {
    'use server';
    const client = getClient();
    const name = formData.get('name');
    const description = formData.get('description');
    const theme = formData.get('theme');
    try {
      const bookClub = await client.mutate({
        mutation: CREATE_BOOK_CLUB,
        variables: { input: { description, name, theme } },
      });

      const bookClubId = get('data.createBookClub.id', bookClub);
      redirect(`/dashboard/book-clubs/${bookClubId}/edit`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>Create book club</h1>
      <ContentWrapper>
        <form action={create}>
          <fieldset>
            <Field id="name" label="Name" name="name" type="input" required />
            <Field id="description" label="Description" name="description" type="textarea" required />
            <Field id="theme" label="Theme" name="theme" type="input" required />
            <Button>Submit</Button>
          </fieldset>
        </form>
      </ContentWrapper>
    </div>
  );
};

export default CreateBookClubs;
