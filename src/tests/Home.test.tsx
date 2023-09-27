import Home from "../pages";
// import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";
import { Mock, afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
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

const myVarDataValue = vi.fn()
  .mockReturnValueOnce('original value')
  .mockReturnValueOnce('updated value');

const mutationCallCounter = vi.fn()

const server = setupServer(
    trpcMsw.getMyVar.query(async (req, res, ctx) => {
      return res(ctx.status(200), ctx.data(myVarDataValue()))
    }),
    trpcMsw.changeMyVar.mutation((req, res, ctx) => {
      mutationCallCounter()
      return res(ctx.status(200), ctx.data('success!'))
    })
  )

  server.printHandlers();

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
        const orig = await screen.findByText('original value')
        expect(orig).toBeInTheDocument();

        const updateGreetingButton = screen.getByRole('button');
        fireEvent.click(updateGreetingButton)

        const updated = await screen.findByText('updated value')
        expect(updated).toBeInTheDocument();
        expect(mutationCallCounter.mock.calls.length).toBe(1)
    })
})

function spyOn(mutationCallCounter: Mock<any, any>) {
  throw new Error('Function not implemented.');
}
