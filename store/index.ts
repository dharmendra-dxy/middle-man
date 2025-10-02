import { Workspace } from "@/types/workspace";
import {create} from "zustand";

interface WorkspaceState {
    selectedWorkspace : Workspace | null;
    setSelectedWorkspace: (workspace:Workspace) => void;
}

export const useWorkspaceState = create<WorkspaceState>((set) => ({
    selectedWorkspace: null,
    setSelectedWorkspace: (workspace) => set(()=>({selectedWorkspace: workspace})),
}));