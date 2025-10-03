import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCollection, deleteCollection, editCollection, getCollections } from "@/actions/collections.actions";


/* 
* useCollections
*/
export function useCollections(workspaceId: string){
    return useQuery({
        queryKey: ["collections", workspaceId],
        queryFn: async () => getCollections(workspaceId),
    })
}

/* 
* useCreateCollections
*/

export function useCreateCollections(workspaceId:string){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (name: string) => createCollection(name, workspaceId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["collections", workspaceId]})
        }
    })
}

/* 
* useDeleteCollections
*/

export function useDeleteCollections(collectionId:string){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => deleteCollection(collectionId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["collections"]})
        }
    })
}

/* 
* useEditCollections
*/

export function useEditCollections(collectionId:string, name:string){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => editCollection(collectionId, name),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["collections"]})
        }
    })
}