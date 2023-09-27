import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';
import { initTRPC } from '@trpc/server';
import superjson from 'superjson';

const storage = {
  myVar: 'foo'
}

const t = initTRPC.create({
  // Optional:
  transformer: superjson,
  // Optional:
  errorFormatter(opts) {
    const { shape } = opts;
    return {
      ...shape,
      data: {
        ...shape.data,
      },
    };
  },
});

export const legacyRouter = trpc.router()
  .query('sofa', {
    resolve: () => ({
      foo: 'bar'
    })
  })
  .query('hello', {
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
  })
  .interop();

const mainRouter = t.router({
  greeting: t.procedure.query(() => 'hello from tRPC v10!'),
  getMyVar: t.procedure.query(() => storage.myVar),
  changeMyVar: t.procedure
    .input(z.object({ value: z.string() }))
    .mutation((opts) => {
      console.log('mutating value', opts.input.value)
      storage.myVar = opts.input.value;
      return opts.input.value;
    })
});

// Merge v9 router with v10 router
// This is necessary because it somehow decorates the legacy router 
// with what v10 needs to work.
export const appRouter = t.mergeRouters(legacyRouter, mainRouter);

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
// THIS IS THE GLUE BETWEEN THE TRPC ROUTER/CONTEXT AND NEXTJS
// this takes our queries/mutations in app router and converts them
// to NextJS handler functions (cf. hello.ts)
export default trpcNext.createNextApiHandler({
  router: appRouter,
  // Note null is no long a valid return type. Probably doesn't matter for us.
  createContext: () => ({}),
});
