import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { CREATE_WORD } from '../../../../queries';
import { getClient } from '../../../../apollo-client';
import Button from '../../../../components/button';
import ContentWrapper from '../../../../components/content-wrapper';
import Input from '../../../../components/input';

const AddWords = async (props) => {
  async function create(formData: FormData) {
    'use server';
    const name = formData.get('name');
    const description = formData.get('description');
    const client = getClient();

    try {
      await client.mutate({
        mutation: CREATE_WORD,
        variables: { input: { name, description } },
      });
    } catch (error) {
      console.log(error);
    }
    redirect('/dashboard/words/a');
  }

  return (
    <div>
      <h1>Add new word</h1>
      <ContentWrapper>
        <form action={create} method="POST">
          <fieldset>
            <p>
              <label htmlFor="name">Word</label>
              <Input type="input" name="name" id="name" />
            </p>
            <p>
              <label htmlFor="word">Description</label>
              <Input type="input" name="description" id="description" />
            </p>
            <p>
              <Button>Submit</Button>
            </p>
          </fieldset>
        </form>
      </ContentWrapper>
    </div>
  );
};

export default AddWords;
