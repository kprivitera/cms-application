import { get } from 'lodash/fp';
import { redirect } from 'next/navigation';

import { GET_BOOK_HAS_USER_RATING, MAKE_RATING_AND_REVIEW } from '../../../../../../queries';
import { getClient } from '../../../../../../apollo-client';
import Button from '../../../../../../components/button';
import ContentWrapper from '../../../../../../components/content-wrapper';
import Field from '../../../../../../components/field';
import getUserId from '../../../../../../utils/get-user-id';

const AddReview = async ({ params }) => {
  const bookId = get('bookId', params);
  const userId = await getUserId();
  const client = getClient();

  const userRatingData = await client.query<{ data: unknown }>({
    query: GET_BOOK_HAS_USER_RATING,
    variables: { bookId, userId },
  });
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

  const ratingOptions = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
  ];

  return (
    <div>
      <h1>Review</h1>
      <ContentWrapper>
        <form action={create} method="POST">
          <fieldset>
            {!userRating?.hasUserRated ? (
              <p>
                <Field type="select" label="Rating" name="rating" options={ratingOptions} />
              </p>
            ) : (
              <div>User has already made a rating.</div>
            )}
            <p>
              <Field label="My Label" type="textarea" name="review" rows={5} cols={30} />
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
