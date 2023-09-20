import { directTrpcClient } from "@/utils/trpcHooks";

const DirectComponent = () => {
    // TODO: fix the query syntax for direct queries
    // directTrpcClient.proxy.greeting.query()
    
    // directTrpcClient.query('sofa').then ((data) => {
    //     console.log('a sofa appears!', data)
    // })
    
    return <div>
        Sofa!
    </div>
}
    
export default DirectComponent