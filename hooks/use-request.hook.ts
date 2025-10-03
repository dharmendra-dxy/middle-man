import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { saveRequest, getAllRequestFromCollection, addRequestToCollection } from "@/actions/requests.actions";
import { Request } from "@/types/request";


/* useAddRequestToCollection */
export function useAddRequestToCollection (collectionId: string){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (value: Request)=> addRequestToCollection( collectionId, value),
        onSuccess: ((data)=> {
            queryClient.invalidateQueries({queryKey: ["requests", collectionId]})
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


/* useAddRequestToCollection */
export function useSaveRequest (id: string){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (value: Request)=> saveRequest( id, value),
        onSuccess: ((data)=> {
            queryClient.invalidateQueries({queryKey: ["requests"]})
        })
    }) 
}

