'use client';
import { Suspense, useState } from 'react';
import { flow, get, omit, set, toNumber } from 'lodash/fp';
import { useMutation } from '@apollo/client';
import { useSearchParams } from 'next/navigation';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import type { NextPage } from 'next';

import { GET_WORD, UPDATE_WORD } from '../../../../queries';

const EditWordForm: NextPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [updateWord] = useMutation(UPDATE_WORD);

  const { data } = useSuspenseQuery(GET_WORD, {
    variables: { id },
  });
  const [form, setForm] = useState(get('word', data));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const id = flow(get('id'), toNumber)(form);
    const submissionData = flow(omit(['__typename']), set('id', id))(form);
    updateWord({ variables: { input: submissionData } }).then((response) => {
      console.log(response);
    });
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <form onSubmit={onSubmit}>
        <fieldset>
          <legend>Edit word</legend>
          <p>
            <label htmlFor="name">Word</label>
            <input type="text" id="name" name="name" value={form.name} onChange={handleChange} />
          </p>
          <p>
            <label htmlFor="word">Description</label>
            <input type="text" id="description" name="description" value={form.description} onChange={handleChange} />
          </p>
          <p>
            <button type="submit">Submit</button>
          </p>
        </fieldset>
      </form>
    </Suspense>
  );
};

export default EditWordForm;
