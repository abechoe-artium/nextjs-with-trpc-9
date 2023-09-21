import '@/styles/globals.css'
import type { AppType, AppProps } from 'next/app'
import { withTRPC } from '@trpc/next';
import superjson from 'superjson'
import { httpBatchLink } from '@trpc/client';
// Note: This moved into next/app
// import { AppType } from 'next/dist/shared/lib/utils';

import type { AppRouter } from './api/trpc/[trpc]';
import { trpc10 } from '@/utils/trpcHooks';

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

// function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }

export default trpc10.withTRPC(MyApp);