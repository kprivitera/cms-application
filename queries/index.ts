import { gql } from '@apollo/client';

export const GET_WORDS = gql`
  query GetWords($itemsByPage: Int!, $page: Int!) {
    words(itemsByPage: $itemsByPage, page: $page) {
      id
      name
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
