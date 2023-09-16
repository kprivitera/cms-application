'use server';
import { Suspense } from 'react';
import { get, map } from 'lodash/fp';
import Link from 'next/link';
import type { NextPage } from 'next';

import { GET_WORDS } from '../../../queries';
import { getClient } from '../../../apollo-client';

const Words: NextPage = async () => {
  const client = getClient();
  const wordsData = await client.query<{ data: unknown }>({
    query: GET_WORDS,
    variables: { itemsByPage: 50, page: 1 },
  });
  const words = get('data.words', wordsData);
  return (
    <Suspense fallback={<p>Loading feed...</p>}>
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
                  <Link href={`/dashboard/words/delete?id=${id}`}>Delete</Link>
                </td>
              </tr>
            );
          }, words)}
        </tbody>
      </table>
    </Suspense>
  );
};

export default Words;
