import { map, omit } from 'lodash/fp';

import { RatingsBreakdown } from '../../../../types';

const mapWithKey = (map as any).convert({ cap: false });

type GetRatingPercentageParams = {
  count: number;
  ratingsBreakdown: RatingsBreakdown;
};

const getRatingPercentage = ({ ratingsBreakdown, count }: GetRatingPercentageParams) => {
  const filteredRatingBreakdown = omit(['__typename'], ratingsBreakdown);
  return mapWithKey((value: number, key: string) => {
    const percentage = value !== 0 ? (value / count) * 100 : 0;
    const ratingAmount = parseInt(key.replace(/\D/g, ''), 10);
    return { count: value, id: key, name: `${ratingAmount} stars`, percent: percentage.toFixed(0) };
  }, filteredRatingBreakdown);
};

export default getRatingPercentage;
