import { directTrpcClient } from "@/utils/trpcHooks";
import { useEffect, useState } from "react";

const DirectComponent = () => {
    // what we think it should be, according the docs:
    const [greeting, setGreeting] = useState('')

    useEffect(() => {
        const fetchGreeting = async () => {
          const result = await directTrpcClient.greeting.query();
          setGreeting(result.json);
        }

        fetchGreeting();
    }, []);
    
    return (
    <div>
      Sofa! {greeting}
    </div>
    )
}
    
export default DirectComponent