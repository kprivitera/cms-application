import { gql } from '@apollo/client';

export const GET_WORDS = gql`
  query GetWords($itemsByPage: Int!, $letter: String, $page: Int!) {
    words(itemsByPage: $itemsByPage, letter: $letter, page: $page) {
      id
      name
      description
    }
  }
`;

export const GET_WORD = gql`
  query Word($id: ID) {
    word(id: $id) {
      name
      id
      description
    }
  }
`;

export const UPDATE_WORD = gql`
  mutation UpdateWord($input: UpdateWordInput) {
    updateWord(input: $input) {
      name
      id
      description
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query User($userId: Int) {
    user(id: $userId) {
      firstName
      email
      friends {
        email
        firstName
        id
        lastName
        username
      }
      id
      lastName
      username
      receivedFriendRequests {
        id
        email
        lastName
        senderId
        status
        username
      }
      profileImage
      coverImage
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($username: String!, $password: String!) {
    authenticate(username: $username, password: $password)
  }
`;

export const CREATE_WORD = gql`
  mutation Authenticate($input: WordInput) {
    createWord(input: $input) {
      description
      id
      name
    }
  }
`;

export const DELETE_WORD = gql`
  mutation Authenticate($id: ID) {
    deleteWord(id: $id)
  }
`;

export const SEARCH_USERS = gql`
  query SearchUsers($searchTerm: String!, $currentUserId: ID!) {
    searchUsers(searchTerm: $searchTerm, currentUserId: $currentUserId) {
      email
      firstName
      id
      lastName
      username
      friendStatus
    }
  }
`;

export const SEND_FRIEND_REQUEST = gql`
  mutation SendFriendRequest($friendId: Int, $userId: Int) {
    sendFriendRequest(friendId: $friendId, userId: $userId)
  }
`;

export const ACCEPT_FRIEND_REQUEST = gql`
  mutation AcceptFriendRequest($friendRequestId: Int) {
    acceptFriendRequest(friendRequestId: $friendRequestId)
  }
`;

export const UPDATE_PROFILE_IMAGE = gql`
  mutation UpdateProfileImage($imageUrl: String, $userId: Int) {
    updateProfileImage(imageUrl: $imageUrl, id: $userId)
  }
`;

export const UPDATE_PROFILE_COVER_IMAGE = gql`
  mutation UpdateCoverImage($imageUrl: String, $userId: Int) {
    updateCoverImage(imageUrl: $imageUrl, id: $userId)
  }
`;

export const GET_BOOKS = gql`
  query GetBooks {
    books {
      author {
        firstName
        description
        id
        image
        lastName
      }
      description
      genres {
        title
        id
        description
      }
      id
      pageCount
      title
      coverImage
    }
  }
`;

export const GET_BOOK_BY_ID = gql`
  query Book($userId: ID, $bookId: ID) {
    book(userId: $userId, id: $bookId) {
      author {
        id
        image
        lastName
        firstName
        description
      }
      coverImage
      description
      genres {
        title
        id
        description
      }
      id
      pageCount
      title
      series {
        title
        seriesNumber
        description
      }
      ratings {
        count
        hasUserRated
        averageRating
        userRating
        ratingsBreakdown {
          rating5
          rating4
          rating3
          rating2
          rating1
        }
      }
      reviews {
        firstName
        id
        lastName
        profileImage
        review
        timestamp
        username
        rating
        comments {
          comment
          id
          timestamp
          username
          profileImage
        }
      }
      userReview {
        firstName
        id
        lastName
        profileImage
        review
        timestamp
        username
        rating
      }
    }
  }
`;

export const MAKE_RATING = gql`
  mutation MakeRating($rating: Int, $userId: Int, $bookId: Int) {
    makeRating(rating: $rating, userId: $userId, bookId: $bookId)
  }
`;

export const MAKE_REVIEW = gql`
  mutation MakeReview($review: String, $userId: Int, $bookId: Int) {
    makeReview(review: $review, userId: $userId, bookId: $bookId)
  }
`;

export const MAKE_RATING_AND_REVIEW = gql`
  mutation MakeRatingAndReview($bookId: Int, $review: String, $rating: Int, $userId: Int) {
    makeRatingAndReview(bookId: $bookId, review: $review, rating: $rating, userId: $userId)
  }
`;

export const GET_BOOK_HAS_USER_RATING = gql`
  query Book($userId: ID, $bookId: ID) {
    book(userId: $userId, id: $bookId) {
      ratings {
        hasUserRated
        userRating
      }
    }
  }
`;

export const MAKE_COMMENT = gql`
  mutation Mutation($userId: Int, $reviewId: Int, $comment: String) {
    makeComment(userId: $userId, reviewId: $reviewId, comment: $comment)
  }
`;
