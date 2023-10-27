import { map } from 'lodash/fp';

import { MAKE_RATING } from '../../queries';
import { RatingsBreakdown } from '../../types';
import { getClient } from '../../apollo-client';
import { revalidatePath } from 'next/cache';
import MakeRating from './components/make-rating';
import PercentageBar from './components/percentage-bar';
import Ratings from '../ratings';
import getRatingPercentages from './utils/get-rating-percentages';
import getUserId from '../../utils/get-user-id';

type RatingSummaryProps = {
  averageRating: number;
  bookId: number;
  count: number;
  hasUserRated: boolean | null;
  ratingsBreakdown: RatingsBreakdown;
};

const RatingSummary = ({ averageRating, bookId, count, hasUserRated, ratingsBreakdown }: RatingSummaryProps) => {
  async function makeRating(rating: number, bookId: number) {
    'use server';
    const userId = await getUserId();
    const client = getClient();
    await client.mutate<{ data: unknown }>({
      mutation: MAKE_RATING,
      variables: { bookId, rating, userId },
    });
    revalidatePath(`http://localhost:3000/dashboard/books/${bookId}`);
  }

  const ratingPercentages = getRatingPercentages({ count, ratingsBreakdown });

  return (
    <div className="w-3/5">
      <h3>What do you think?</h3>
      {hasUserRated ? (
        <div className="mb-4">User has rated</div>
      ) : (
        <MakeRating bookId={bookId} makeRating={makeRating} />
      )}
      <h3>Community Reviews</h3>
      {count ? <Ratings averageRating={averageRating} count={count} /> : <div className="mb-4">No ratings made</div>}
      {map(({ id, name, count, percent }) => {
        return (
          <div key={id}>
            <PercentageBar count={count} name={name} percent={percent} />
          </div>
        );
      }, ratingPercentages)}
    </div>
  );
};

export default RatingSummary;
