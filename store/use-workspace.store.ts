import { Workspace } from "@/types/workspace";
import {create} from "zustand";

interface WorkspaceState {
    selectedWorkspace : Workspace | null;
    setSelectedWorkspace: (workspace:Workspace) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
    selectedWorkspace: null,
    setSelectedWorkspace: (workspace) => set(()=>({selectedWorkspace: workspace})),
}));