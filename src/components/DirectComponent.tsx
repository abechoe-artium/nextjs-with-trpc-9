import { directTrpcClient } from "@/utils/trpcHooks";

const DirectComponent = () => {
    // TODO: fix the query syntax for direct queries
    // directTrpcClient.proxy.greeting.query()
    
    // directTrpcClient.query('sofa').then ((data) => {
    //     console.log('a sofa appears!', data)
    // })

    // what we think it should be, according the docs:
    console.log('greeting', directTrpcClient.greeting.query())
    // ...but it doesn't work
    
    return <div>
        Sofa!
    </div>
}
    
export default DirectComponent