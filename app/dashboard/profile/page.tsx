import { get } from 'lodash/fp';
import { revalidatePath } from 'next/cache';
import Image from 'next/image';

import { API_URL } from '../../../constants';
import { GET_USER_BY_ID, UPDATE_PROFILE_COVER_IMAGE, UPDATE_PROFILE_IMAGE } from '../../../queries';
import { User } from '../../../types';
import { getClient } from '../../../apollo-client';
import ContentWrapper from '../../../components/content-wrapper';
import OpenPreview from './components/open-preview';
import getUserId from '../../../utils/get-user-id';

interface UserData {
  user: User;
}

const Profile = async () => {
  async function uploadImage(formData: FormData) {
    'use server';
    const userId = await getUserId();
    const response = await fetch(`${API_URL}/file-upload/profile/${userId}`, {
      method: 'POST',
      body: formData,
    });
    const imageUrl = await response.json();

    const client = getClient();
    await client.mutate<{ data: unknown }>({
      mutation: UPDATE_PROFILE_IMAGE,
      variables: { imageUrl, userId },
    });
    revalidatePath('http://localhost:3000/dashboard/profile');
  }

  async function uploadCoverImage(formData: FormData) {
    'use server';
    const userId = await getUserId();
    const response = await fetch(`${API_URL}/file-upload/cover/${userId}`, {
      method: 'POST',
      body: formData,
    });
    const imageUrl = await response.json();

    const client = getClient();
    await client.mutate<{ data: unknown }>({
      mutation: UPDATE_PROFILE_COVER_IMAGE,
      variables: { imageUrl, userId },
    });
    revalidatePath('http://localhost:3000/dashboard/profile');
  }

  const userId = await getUserId();
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
      <ContentWrapper hasPadding={false}>
        <div className="pb-6">
          <div>
            <Image
              className="w-full h-[250px] object-cover rounded-md"
              src={`http://localhost:4000/${user.coverImage}`}
              alt="Description of the image"
              width={500}
              height={300}
            />
          </div>
          <div>
            <div className="mt-[-2.5rem]">
              <Image
                className="ml-6 border-[#2f3349] border-[5px] w-[120px] relative"
                src={`http://localhost:4000/${user.profileImage}`}
                alt="Description of the image"
                width={500}
                height={300}
              />
            </div>
            <div></div>
          </div>
        </div>
      </ContentWrapper>
      <ContentWrapper>
        <p>First name: {user.firstName}</p>
        <p>Last name: {user.lastName}</p>
        <p>Username: {user.username}</p>
        <p>Profile image:</p>
      </ContentWrapper>

      <ContentWrapper>
        <OpenPreview buttonText="Update profile image" onSubmit={uploadImage} />
        <OpenPreview buttonText="Update cover image" onSubmit={uploadCoverImage} />
      </ContentWrapper>
    </div>
  );
};

export default Profile;
