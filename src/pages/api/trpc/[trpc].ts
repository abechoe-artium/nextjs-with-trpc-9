import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';

export const appRouter = trpc.router().query('hello', {
  input: z
    .object({
      text: z.string().nullish(),
    })
    .nullish(),
  resolve({ input }) {
    return {
      greeting: `hello ${input?.text ?? 'world'}`,
    };
  },
});

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
// THIS IS THE GLUE BETWEEN THE TRPC ROUTER/CONTEXT AND NEXTJS
// this takes our queries/mutations in app router and converts them
// to NextJS handler functions (cf. hello.ts)
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
