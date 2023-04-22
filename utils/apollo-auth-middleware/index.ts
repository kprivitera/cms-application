import { ApolloLink } from '@apollo/client'
import jwt from 'jsonwebtoken'

function setCookie(name, value, days) {
  let expires = ''
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = '; expires=' + date.toUTCString()
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/'
}

const authMiddleware = new ApolloLink((operation, forward) => {
  const storedToken = localStorage.getItem('token') || ''
  console.log('stored token', storedToken)
  try {
    const authToken = jwt.verify(storedToken, 'secret')
    console.log('auth token', authToken)
  } catch (error) {
    console.log('jwt error', error)
  }
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => {
    return {
      headers: {
        ...headers,
        'x-access-token': localStorage.getItem('token') || null,
      },
    }
  })
  return forward(operation)
})

export default authMiddleware
