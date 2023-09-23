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
