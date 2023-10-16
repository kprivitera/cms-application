'use server';
import { Suspense } from 'react';
import { camelCase, get, map, toLower } from 'lodash/fp';
import type { NextPage } from 'next';

import { ALPHABET } from '../../../../constants';
import { GET_WORDS } from '../../../../queries';
import { getClient } from '../../../../apollo-client';
import Button from '../../../../components/button';
import ContentWrapper from '../../../../components/content-wrapper';
import LinkButton from '../../../../components/link-button';
import Table from '../../../../components/table';

const DEFAULT_LETTER = 'a';
const dictionaryFields = ['name', 'description'];

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
        <ContentWrapper>
          <nav className="flex flex-col space-y-4 items-center justify-center py-2">
            <ul className="inline-flex -space-x-px text-sm">
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
                >
                  Previous
                </a>
              </li>
              {map(
                (letter) => (
                  <li>
                    <a
                      href={`/dashboard/words/${toLower(letter)}`}
                      className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                    >
                      {letter}
                    </a>
                  </li>
                ),
                ALPHABET,
              )}
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </ContentWrapper>
        <ContentWrapper hasPadding={false}>
          <div className="pl-6 pt-6 my-4">
            <LinkButton href={`/dashboard/words/add`}>Add new word</LinkButton>
          </div>
          <Table
            theadData={[...dictionaryFields, 'edit', 'delete']}
            tbodyData={map((word) => {
              const items = dictionaryFields.map((item) => word[camelCase(item)]);
              return {
                id: word.id,
                items: [
                  ...items,
                  <LinkButton key={word.id} href={`/dashboard/words/edit?id=${word.id}`}>
                    Update
                  </LinkButton>,
                  <form key={word.id} action={`/dashboard/words/delete?id=${word.id}`} method="POST">
                    <Button>Delete</Button>
                  </form>,
                ],
              };
            }, words)}
          />
        </ContentWrapper>
      </Suspense>
    </div>
  );
};

export default Words;
