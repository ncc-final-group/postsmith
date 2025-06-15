'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
        refetchIntervalInBackground: false,
        refetchOnMount: 'always',
        retryDelay: 2000,
        refetchInterval: 10000,
        staleTime: 60 * 1000,
        enabled: true,
      },
    },
  });
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
