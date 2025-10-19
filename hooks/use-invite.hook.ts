"use client";

import { useMutation , useQuery , useQueryClient } from "@tanstack/react-query";
import {
  generateWorkspaceInvite,
  acceptWorkspaceInvite,
  getAllWorkspaceMember
} from "@/actions/invites.actions";


/* useGenerateWorkspaceInvite */
export const useGenerateWorkspaceInvite = (workspaceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => generateWorkspaceInvite(workspaceId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workspace-invites", workspaceId],
      });
    },
  })
}

/* useAcceptWorkspaceInvite */
export const useAcceptWorkspaceInvite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (token: string) => acceptWorkspaceInvite(token),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workspace-members"],
      })
    }
  });
  
};

/*  useGetWorkspaceMemebers */
export const useGetWorkspaceMemebers = (workspaceId: string)=>{

  return useQuery({
    queryKey: ["workspace-members"],
    queryFn: async () => getAllWorkspaceMember(workspaceId),
    
  });
}