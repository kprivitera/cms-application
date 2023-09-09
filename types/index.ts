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
