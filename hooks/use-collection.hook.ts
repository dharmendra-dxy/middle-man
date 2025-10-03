import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCollection, deleteCollection, editCollection, getCollections } from "@/actions/collections.actions";


/* 
* useCollections
*/
``
export async function useCollections(workspaceId: string){
    return useQuery({
        queryKey: ["collections", workspaceId],
        queryFn: async () => getCollections(workspaceId),
    })
}

/* 
* useCreateCollections
*/

export async function useCreateCollections(name: string, workspaceId:string){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => createCollection(name, workspaceId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["collections", workspaceId]})
        }
    })
}

/* 
* useDeleteCollections
*/

export async function useDeleteCollections(collectionId:string){
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

export async function useEditCollections(collectionId:string, name:string){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => editCollection(collectionId, name),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["collections"]})
        }
    })
}