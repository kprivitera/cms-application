import { cookies } from 'next/headers';
import { get } from 'lodash/fp';

import { GET_USER_BY_ID } from '../../queries';
import { User } from '../../types';
import { getClient } from '../../apollo-client';
import { verify } from '../../utils/jwt';
import Header from '../../components/header';
import Sidebar from '../../components/sidebar';

const menuItems = [
  { link: '/dashboard/profile', text: 'Profile' },
  { link: '/dashboard/words/a', text: 'Words' },
  { link: '/dashboard/words/add', text: 'Add words' },
  { link: '/dashboard/friends', text: 'Friends' },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const authCookie = cookieStore.get('auth-token') || '';
  const authToken = get('value', authCookie);
  const decryptedJWT = await verify<number>(authToken, 'secret');

  const userId = decryptedJWT.data;

  const client = getClient();
  const userData = await client.query<{ data: UserData }>({
    query: GET_USER_BY_ID,
    variables: {
      userId,
    },
  });

  const user = get('data.user', userData);

  return (
    <section>
      <Sidebar menuItems={menuItems} />
      <Header user={user} />
      {children}
    </section>
  );
}
