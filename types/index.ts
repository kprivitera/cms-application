export type TableBody = {
  id: string;
  items: Array<string>;
};

export type User = {
  email: string;
  firstName: string;
  friends: number[];
  id: number;
  lastName: string;
  receivedFriendRequests: string[];
  username: string;
  __typename: string;
};

type RatingPercentType = 'rating1' | 'rating2' | 'rating3' | 'rating4' | 'rating5';

export type RatingsBreakdown = {
  [key in RatingPercentType]: number;
};
