import Home from "../pages";
// import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import React, { PropsWithChildren } from 'react';
import superjson from 'superjson';


import { createTRPCMsw } from 'msw-trpc'
import type { AppRouter } from '../pages/api/trpc/[trpc]'

import { setupServer } from 'msw/node'
import { createTRPCReact, httpBatchLink } from "@trpc/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "../utils/trpcHooks";

export const trpcMsw = createTRPCMsw<AppRouter>() /* 👈 */

export const trpcReact = createTRPCReact<AppRouter>({});

const url = `http://localhost:${process.env.PORT ?? 3001}/api/trpc`;

const trpcClient = trpcReact.createClient({
    links: [httpBatchLink({ url })],
    // transformer: superjson,
  });

const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: Infinity } },
});

const server = setupServer(
    trpcMsw.greeting.query(async (req, res, ctx) => {
      return res(ctx.status(200), ctx.data('foo'))
    }),
  )

  beforeAll(() => {
    server.listen();
  });
  
  afterAll(() => {
    server.close();
  });

export const withTRPC = ({ children }: PropsWithChildren) => {
    return (
        <trpcReact.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </trpcReact.Provider>
)};




describe("first test", () => {
    it('renders', async () => {
        render(
            <Home />,
            { wrapper: withTRPC }
        )
        
        // expect(screen.getByText('foo')).toBeInTheDocument();
        // const items = await screen.findAllByText(/Item #[0-9]: /)
        const fooText = await screen.findByText('foo')
        expect(fooText).toBeInTheDocument();
    })
})