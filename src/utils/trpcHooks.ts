import { createReactQueryHooks } from '@trpc/react-query';
import type { AppRouter } from '../pages/api/trpc/[trpc]';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

export const trpc = createReactQueryHooks<AppRouter>();
// => { useQuery: ..., useMutation: ...}

export const directTrpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3001/api/trpc',
      headers() {
        return {
          'x-foo': 'bar',
        };
      },
    })
  ]
});
