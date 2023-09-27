import { trpc } from '../utils/trpcHooks';
import React, { useState } from 'react';

export default function Home() {
  // v9 legacy queries continue to look like this
  // const hello = trpc.useQuery(['hello', { text: 'from trpc10 legacy router!' }])
  
  // v10 new router queries look like this
  const { data: myVarValue, isLoading, refetch} = trpc.proxy.getMyVar.useQuery();
  const { mutateAsync, isLoading: isMutating } = trpc.proxy.changeMyVar.useMutation();

  async function updateVariable () {
    console.log('before mutate is called');
    await mutateAsync({ value: `${myVarValue}.`})
    console.log('after mutate is called');
    refetch()
  }
  
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <h1>My Var</h1>
      <p>{myVarValue}</p>
      <div>{isMutating ? 'mutating...' : 'not mutating'}</div>
      <button onClick={updateVariable}>Click Me for a new greeting!</button>
    </main>
  )
}
