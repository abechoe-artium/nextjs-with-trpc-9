import { useQueryClient } from '@tanstack/react-query';
import { trpc } from '../utils/trpcHooks'

// TODO: make invalidating queries work with queryClient
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