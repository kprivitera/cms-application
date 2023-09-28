import { cookies } from 'next/headers';
import { get } from 'lodash/fp';
import { redirect } from 'next/navigation';
import type { NextPage } from 'next';

import { LOGIN_USER } from '../queries';
import { getClient } from '../apollo-client';
import Button from '../components/button';
import ContentWrapper from '../components/content-wrapper';
import Input from '../components/input';

const Home: NextPage = () => {
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
    <main className="max-w-2xl mx-auto my-12">
      <ContentWrapper>
        <h1 className="">Welcome</h1>
        <form action={create}>
          <label htmlFor="username">Name</label>
          <Input id="username" name="username" type="text" required />
          <label htmlFor="password">Email</label>
          <Input id="password" name="password" type="text" required />
          <Button>Submit</Button>
        </form>
      </ContentWrapper>
    </main>
  );
};

export default Home;
