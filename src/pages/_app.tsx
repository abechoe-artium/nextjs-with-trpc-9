import '@/styles/globals.css'
import type { AppType, AppProps } from 'next/app'
import { withTRPC } from '@trpc/next';
import superjson from 'superjson'
import { httpBatchLink } from '@trpc/client';
// Note: This moved into next/app
// import { AppType } from 'next/dist/shared/lib/utils';

import type { AppRouter } from './api/trpc/[trpc]';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default withTRPC({
     config() {
      return {
        links: [
          httpBatchLink({
            /**
             * If you want to use SSR, you need to use the server's full URL
             * @link https://trpc.io/docs/ssr
             **/
            url: `http://localhost:3001/api/trpc`,
          })
        ],
        transformer: superjson,
      };
    },
    // }}
    // /**
    //  * If you want to use SSR, you need to use the server's full URL
    //  * @link https://trpc.io/docs/ssr
    //  */
    // const url = process.env.VERCEL_URL
    //   ? `https://${process.env.VERCEL_URL}/api/trpc`
    //   : 'http://localhost:3001/api/trpc';
    // return {
    //   url,
    //   /**
    //    * @link https://tanstack.com/query/v3/docs/react/reference/QueryClient
    //    */
    //   // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    // };
  // },
  /**
   * @link https://trpc.io/docs/ssr
   */
    ssr: true,
})(App);