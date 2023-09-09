import { cookies } from 'next/headers';
import { get, map } from 'lodash/fp';
import type { NextPage } from 'next';

import { GET_WORDS } from '../../../queries';
import { getClient } from '../../../apollo-client';

// interface UserData {
//   user: User;
// }

const Words: NextPage = async () => {
  const cookieStore = cookies();
  console.log('words cookie store', cookieStore);
  console.log('words page');

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
