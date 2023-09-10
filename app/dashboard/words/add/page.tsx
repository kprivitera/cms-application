import { redirect } from 'next/navigation';
import type { NextPage } from 'next';

import { CREATE_WORD } from '../../../../queries';
import { getClient } from '../../../../apollo-client';

const AddWords: NextPage = async () => {
  async function create(formData: FormData) {
    'use server';
    const name = formData.get('name');
    const description = formData.get('description');
    console.log({ name, description });
    const client = getClient();
    try {
      const newWord = await client.mutate({
        mutation: CREATE_WORD,
        variables: { input: { name, description } },
      });
      redirect('/dashboard/words/add-action');
    } catch (error) {
      console.log(error);
    }
    redirect('/dashboard/words');
  }
  return (
    <form action={create} method="POST">
      <fieldset>
        <legend>Add new word</legend>
        <p>
          <label htmlFor="name">Word</label>
          <input type="input" name="name" id="name" />
        </p>
        <p>
          <label htmlFor="word">Description</label>
          <input type="input" name="description" id="description" />
        </p>
        <p>
          <button type="submit">Submit</button>
        </p>
      </fieldset>
    </form>
  );
};

export default AddWords;
