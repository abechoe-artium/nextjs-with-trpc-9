import { directTrpcClient } from "@/utils/trpcHooks";

const DirectComponent = () => {
    directTrpcClient.query('sofa').then ((data) => {
        console.log('a sofa appears!', data)
    })
    
    return <div>
        Sofa!
    </div>
}
    
export default DirectComponent