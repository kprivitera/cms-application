import { cookies } from 'next/headers';
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
  try {
    const client = getClient();
    const words = await client.query<{ data: unknown }>({
      query: GET_WORDS,
      variables: { itemsByPage: 300, page: 1 },
    });
    console.log('words', words);
  } catch (error) {
    // console.log('knkn', error);
  }

  // console.log(words);
  // const [getWords, { loading, error, data }] = useLazyQuery(GET_WORDS);
  // const [getUser, { loading: loadingUser, error: errorUser, data: dataUser }] = useLazyQuery(GET_USER_BY_ID);
  // const [tableBody, setTableBody] = useState<Array<TableBody>>([]);
  // const words = _.get(data, 'words');

  // const getWordsHandler = async () => await getWords({ variables: { itemsByPage: 300, page: 1 } });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const user = await getUser({ variables: { userId: 1 } });
  //     console.log('user', user);
  //   };
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   if (words) {
  //     const createTableBody = _.map(words, ({ id, name, description }) => ({
  //       id,
  //       items: [name, description],
  //     }));
  //     setTableBody(createTableBody);
  //   }
  // }, [words]);

  // if (loading) {
  //   return <div>Loading</div>;
  // }

  // if (error) {
  //   return <div>Error please try again</div>;
  // }

  return <div>{/* {words && <Table theadData={['name', 'description']} tbodyData={tableBody} />} */}</div>;
};

export default Words;
