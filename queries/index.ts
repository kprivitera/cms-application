import { gql } from '@apollo/client'

export const GET_WORDS = gql`
  query GetWords($itemsByPage: Int!, $page: Int!) {
    words(itemsByPage: $itemsByPage, page: $page) {
      id
      name
      description
    }
  }
`
export const LOGIN_USER = gql`
  mutation Login($username: String!, $password: String!) {
    authenticate(username: $username, password: $password)
  }
`
