import { useQuery, useQueryClient, useMutation, QueryClient } from "@tanstack/react-query";
import { saveRequest, getAllRequestFromCollection, addRequestToCollection, run } from "@/actions/requests.actions";
import { Request } from "@/types/request";
import { useRequestPlaygroundStore } from "@/store/use-request.store";


/* useAddRequestToCollection */
export function useAddRequestToCollection (collectionId: string){

    const {updateTabFromSavedRequest, activeTabId} = useRequestPlaygroundStore();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (value: Request)=> addRequestToCollection( collectionId, value),
        onSuccess: ((data)=> {
            queryClient.invalidateQueries({queryKey: ["requests", collectionId]});

            // update the palyground request now:
            // @ts-ignore
            updateTabFromSavedRequest(activeTabId!, data.data)
        })
    }) 
}

/* useGetAllRequestFromCollection */
export function useGetAllRequestFromCollection (collectionId: string){
    return useQuery({
        queryKey: ["requests", collectionId],
        queryFn: async () => getAllRequestFromCollection(collectionId),
    }) 
}


/* 
* useAddRequestToCollection 
* Also - update the tab in playground once it is saved.
*/
export function useSaveRequest (id: string){

    const {updateTabFromSavedRequest, activeTabId} = useRequestPlaygroundStore();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (value: Request)=> saveRequest( id, value),
        onSuccess: ((data)=> {
            queryClient.invalidateQueries({queryKey: ["requests"]});

            // update the palyground request now:
            // @ts-ignore
            updateTabFromSavedRequest(activeTabId!, data.data)
        })
    }) 
}

/*
* -------------------------------------------- 
* Run Request:
* -------------------------------------------- 
*/

/* 
Run Request
*/

export function useRunRequest (requestId: string){
    const queryClient = new QueryClient();
    const {setResponseViewerData} = useRequestPlaygroundStore();

    return useMutation({
        mutationFn:async () => await run(requestId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["requests"]});
            // @ts-ignore
            setResponseViewerData(data);
        }
    });
}

