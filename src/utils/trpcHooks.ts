import { createReactQueryHooks } from '@trpc/react';
import type { AppRouter } from '../pages/api/trpc/[trpc]';
import { createTRPCClient } from '@trpc/client';

export const trpc = createReactQueryHooks<AppRouter>();
// => { useQuery: ..., useMutation: ...}

export const directTrpcClient = createTRPCClient<AppRouter>({
  url: 'http://localhost:3001/api/trpc',
});