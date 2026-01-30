import {
  QueryCache,
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from '@tanstack/react-query'
import type { ReactNode } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.state.data !== undefined) {
        return error
      }
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 10 * (1000 * 60),
      gcTime: 15 * (1000 * 60),
      throwOnError: true,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      retryOnMount: true,
      retry: (failureCount, error) => {
        if (error && 'status' in error && typeof error.status === 'number') {
          if (error.status >= 400 && error.status < 500) {
            return false
          }
        }
        return failureCount < 3
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: (failureCount, error) => {
        if (error && 'status' in error && typeof error.status === 'number') {
          if (error.status >= 400 && error.status < 500) {
            return false
          }
        }
        return failureCount < 2
      },
    },
  },
})

export function AppQueryClientProvider({ children }: { children: ReactNode }) {
  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  )
}
