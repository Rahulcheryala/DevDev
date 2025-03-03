import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useState } from 'react'
const queryConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      // Since Remix handles SSR, we can adjust some defaults
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 60 * 1000, // 1 minute
    },
  },
};
export default function QueryProvider({
  children,
}: {
  children: React.ReactNode
}) {
    const [queryClient] = useState(() => new QueryClient(queryConfig));
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
