import Image from 'next/image'
import { Inter } from 'next/font/google'
import { trpc } from '../utils/trpcHooks';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  // v9 legacy queries continue to look like this
  const hello = trpc.useQuery(['hello', { text: 'from trpc10 legacy router!' }])
  
  // v10 new router queries look like this
  const result = trpc.proxy.greeting.useQuery()
  console.log('result: ', result);
  
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        Hello World {hello.data?.greeting}
      </div>
    </main>
  )
}
