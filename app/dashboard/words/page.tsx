import { get, map } from 'lodash/fp';
import type { NextPage } from 'next';

import { GET_WORDS } from '../../../queries';
import { getClient } from '../../../apollo-client';

const Words: NextPage = async () => {
  const client = getClient();
  const wordsData = await client.query<{ data: unknown }>({
    query: GET_WORDS,
    variables: { itemsByPage: 300, page: 1 },
  });
  const words = get('data.words', wordsData);
  return (
    <ul>
      {map(({ name, id, description }) => {
        return (
          <li>
            <div>
              <strong>Name:</strong> {name}
            </div>
            <div>
              <strong>Description:</strong> {description}
            </div>
          </li>
        );
      }, words)}
    </ul>
  );
};

export default Words;
