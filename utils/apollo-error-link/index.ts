import { FetchResult } from '@apollo/client'
import { Observable } from '@apollo/client/utilities'
import { onError } from '@apollo/client/link/error'

import authRetry from '../auth-retry'

const errorLink = onError(({ graphQLErrors, forward, operation }) => {
  if (!graphQLErrors) {
    return
  }
  for (const err of graphQLErrors) {
    switch (err.extensions.code) {
      case 'UNAUTHENTICATED':
        const observable = new Observable<FetchResult<Record<string, any>>>((observer) => {
          // used an annonymous function for using an async function
          ;(async () => {
            try {
              const accessToken = await authRetry()
              const oldHeaders = operation.getContext().headers

              operation.setContext({
                headers: {
                  ...oldHeaders,
                  'x-access-token': accessToken,
                },
              })

              // Retry the failed request
              const subscriber = {
                complete: observer.complete.bind(observer),
                error: observer.error.bind(observer),
                next: observer.next.bind(observer),
              }

              forward(operation).subscribe(subscriber)
            } catch (err) {
              observer.error(err)
            }
          })()
        })
        return observable
    }
  }
})

export default errorLink
