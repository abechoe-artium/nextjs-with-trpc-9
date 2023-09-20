import { directTrpcClient } from "@/utils/trpcHooks";
import { useEffect, useState } from "react";

const DirectComponent = () => {
    // what we think it should be, according the docs:
    const [greeting, setGreeting] = useState('');
    const [hello, setHello] = useState('');

    // TODO: direct v9 queries

    useEffect(() => {
        const fetchGreeting = async () => {
          const result = await directTrpcClient.greeting.query();
          console.log(result)
          setGreeting(result.json);
        }

        const fetchHello = async () => {
          const result = await directTrpcClient.hello.query({text: 'say hi'});
          console.log({result})
          setHello(result.json.greeting);
        }

        fetchGreeting().then(d => console.info({d})).catch(e => console.error({e}));
        fetchHello().then(d => console.info({d})).catch(e => console.error({e}));
    }, []);
    
    return (
      <>
      <div>
        Sofa! {greeting}
      </div>
      <div>
        Couch! {hello}
      </div>
      </>
    )
}
    
export default DirectComponent