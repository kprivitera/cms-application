import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { CREATE_WORD } from '../../../../queries';
import { getClient } from '../../../../apollo-client';
import Button from '../../../../components/button';
import ContentWrapper from '../../../../components/content-wrapper';
import Field from '../../../../components/field';

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
              <Field type="input" label="Word" name="name" id="name" />
            </p>
            <p>
              <Field type="input" label="Description" name="description" id="description" />
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
