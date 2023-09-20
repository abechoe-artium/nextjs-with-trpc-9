import { useQueryClient } from 'react-query';
import { trpc } from '../utils/trpcHooks'

const ComponentWithQueryClient = () => {
    const queryClient = useQueryClient();
    trpc.useQuery(['sofa'], {
      onSuccess() {
        queryClient.invalidateQueries(['hello']);
      },
    });
    return <div>
        Query Client usage
    </div>
}
    
export default ComponentWithQueryClient