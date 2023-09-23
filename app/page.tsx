import { cookies } from 'next/headers';
import { get } from 'lodash/fp';
import { redirect } from 'next/navigation';
import type { NextPage } from 'next';

import { LOGIN_USER } from '../queries';
import { getClient } from '../apollo-client';
import { verify } from '../utils/jwt';

const Home: NextPage = () => {
  // const cookieStore = cookies();
  // const authCookie = cookieStore.get('auth-token') || '';
  // const authToken = get('value', authCookie);
  // console.log('home: authtoken', authToken);

  // // try {
  // verify<number>(authToken, 'secret')
  //   .then((data) => {
  //     console.log('home: authenticated', data);
  //     redirect('/dashboard/profile');
  //   })
  //   .catch((error) => {
  //     if (error.code === 'ERR_JWS_INVALID') {
  //       console.log('home: unauthenticated', error.code);
  //     } else {
  //       throw error;
  //     }
  //   });

  async function create(formData: FormData) {
    'use server';
    const username = formData.get('username');
    const password = formData.get('password');
    const client = getClient();
    const authTokenData = await client.mutate({
      mutation: LOGIN_USER,
      variables: { username, password },
    });
    const authToken = get('data.authenticate', authTokenData);
    const cookieStore = cookies();
    cookieStore.set('auth-token', authToken);
    redirect('/dashboard/profile');
  }
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <div className="">
        <h1 className="text-xl font-semibold">Welcome</h1>
      </div>
      <div className="mt-4">
        <form action={create}>
          <label htmlFor="username">Name</label>
          <input id="username" name="username" type="text" required />
          <label htmlFor="password">Email</label>
          <input id="password" name="password" type="text" required />
          <button type="submit">Submit</button>
        </form>
      </div>
    </main>
  );
};

export default Home;
