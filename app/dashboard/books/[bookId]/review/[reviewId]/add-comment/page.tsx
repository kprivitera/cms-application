import { get } from 'lodash/fp';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { MAKE_COMMENT } from '../../../../../../../queries';
import { getClient } from '../../../../../../../apollo-client';
import Button from '../../../../../../../components/button';
import ContentWrapper from '../../../../../../../components/content-wrapper';
import TextArea from '../../../../../../../components/textarea';
import getUserId from '../../../../../../../utils/get-user-id';

const AddComment = async ({ params }) => {
  async function create(formData: FormData) {
    'use server';
    const { bookId, reviewId } = params;
    const client = getClient();
    const userId = await getUserId();
    const comment = formData.get('comment');

    console.log({ comment, reviewId: parseInt(reviewId), userId });
    try {
      await client.mutate({
        mutation: MAKE_COMMENT,
        variables: { comment, reviewId: parseInt(reviewId), userId },
      });
    } catch (error) {
      console.log(error);
    }
    redirect(`/dashboard/books/${bookId}`);
  }

  return (
    <div>
      <h1>Review</h1>
      <ContentWrapper>
        <form action={create} method="POST">
          <fieldset>
            <p>
              <TextArea label="My Label" name="comment" rows={5} cols={30} />
            </p>
            <p>
              <Button>Submit</Button>
            </p>
          </fieldset>
        </form>
      </ContentWrapper>
    </div>
  );
};

export default AddComment;
