import { cookies } from 'next/headers';
import { get } from 'lodash/fp';

import { GET_USER_BY_ID } from '../../../queries';
import { User } from '../../../types';
import { getClient } from '../../../apollo-client';
import { verify } from '../../../utils/jwt';
import Button from '../../../components/button';
import ContentWrapper from '../../../components/content-wrapper';

interface UserData {
  user: User;
}

const Profile = async () => {
  async function uploadImage(formData: FormData) {
    'use server';

    const cookieStore = cookies();
    const authCookie = cookieStore.get('auth-token') || '';
    const authToken = get('value', authCookie);
    const decryptedJWT = await verify<number>(authToken, 'secret');
    const userId = decryptedJWT.data.toString();
    console.log('userId', userId);
    const response = await fetch(`http://localhost:4000/file-upload/profile/${userId}`, {
      method: 'POST',
      body: formData,
    });
    // console.log('response', response);
  }

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
    <div>
      <h1>Profile</h1>
      <ContentWrapper>
        <p>First name: {user.firstName}</p>
        <p>Last name: {user.lastName}</p>
        <p>Username: {user.username}</p>
      </ContentWrapper>

      <ContentWrapper>
        <fieldset>
          <legend>Upload profile image</legend>
          <form method="post" encType="multipart/form-data" action={uploadImage}>
            <input type="file" name="file" accept="image/*" />
            <Button>Upload</Button>
          </form>
        </fieldset>
      </ContentWrapper>
    </div>
  );
};

export default Profile;
