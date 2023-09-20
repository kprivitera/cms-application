'use server';
import { Suspense } from 'react';
import { get, map, toLower } from 'lodash/fp';
import Link from 'next/link';
import type { NextPage } from 'next';

import { ALPHABET } from '../../../../constants';
import { GET_WORDS } from '../../../../queries';
import { getClient } from '../../../../apollo-client';

const DEFAULT_LETTER = 'a';

const Words: NextPage = async ({ params }) => {
  const letter = get('letter', params);
  const client = getClient();
  const wordsData = await client.query<{ data: unknown }>({
    query: GET_WORDS,
    variables: { itemsByPage: 200, letter: toLower(letter) || DEFAULT_LETTER, page: 1 },
  });
  const words = get('data.words', wordsData);
  return (
    <div>
      <h1>Dictionary</h1>
      <Suspense fallback={<p>Loading feed...</p>}>
        <div>
          <Link href={`/dashboard/words/add`}>Add new word</Link>
        </div>
        {map(
          (letter) => (
            <a href={`/dashboard/words/${toLower(letter)}`}>{letter}</a>
          ),
          ALPHABET,
        )}
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>description</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {map(({ name, id, description }) => {
              return (
                <tr>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{description}</td>
                  <td>
                    <Link href={`/dashboard/words/edit?id=${id}`}>Update</Link>
                  </td>
                  <td>
                    <form key={id} action={`/dashboard/words/delete?id=${id}`} method="POST">
                      <button type="submit">Delete</button>
                    </form>
                  </td>
                </tr>
              );
            }, words)}
          </tbody>
        </table>
      </Suspense>
    </div>
  );
};

export default Words;
