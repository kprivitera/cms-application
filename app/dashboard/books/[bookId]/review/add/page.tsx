import { get } from 'lodash/fp';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { GET_BOOK_HAS_USER_RATING, MAKE_RATING_AND_REVIEW } from '../../../../../../queries';
import { getClient } from '../../../../../../apollo-client';
import Button from '../../../../../../components/button';
import ContentWrapper from '../../../../../../components/content-wrapper';
import TextArea from '../../../../../../components/textarea';
import getUserId from '../../../../../../utils/get-user-id';

const AddReview = async ({ params }) => {
  const bookId = get('bookId', params);
  const userId = await getUserId();
  const client = getClient();

  const userRatingData = await client.query<{ data: unknown }>({
    query: GET_BOOK_HAS_USER_RATING,
    variables: { bookId, userId },
  });
  console.log(userRatingData);
  const userRating = get('data.book.ratings', userRatingData);

  async function create(formData: FormData) {
    'use server';
    const client = getClient();
    const rating = formData.get('rating') as string;
    const review = formData.get('review');
    try {
      await client.mutate({
        mutation: MAKE_RATING_AND_REVIEW,
        variables: { bookId: parseInt(bookId), userId, review, rating: parseInt(rating) },
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
            {!userRating.hasUserRated ? (
              <p>
                <input type="radio" id="html" name="rating" value="1" />
                <input type="radio" id="css" name="rating" value="2" />
                <input type="radio" id="javascript" name="rating" value="3" />
                <input type="radio" id="javascript" name="rating" value="4" />
                <input type="radio" id="javascript" name="rating" value="5" />
              </p>
            ) : (
              <div>User has already made a rating.</div>
            )}
            <p>
              <TextArea label="My Label" name="review" rows={5} cols={30} />
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

export default AddReview;
