import type { NextPage } from 'next';

const AddWords: NextPage = async () => {
  async function create(formData: FormData) {
    'use server';
    const word = formData.get('word');
    const description = formData.get('description');
    console.log({ word, description });
  }
  return (
    <form action={create}>
      <fieldset>
        <legend>Add new word</legend>
        <p>
          <label htmlFor="word">Word</label>
          <input type="input" name="word" id="word" />
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
