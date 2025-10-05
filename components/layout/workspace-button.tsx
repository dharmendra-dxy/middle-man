"use client";

import React, { useEffect, useState } from "react";
import { HintTooltip } from "../common/hint-tooltip";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Plus, User } from "lucide-react";
import { useWorkspaces } from "@/hooks/use-workspace.hook";
import Loader from "../common/loader";
import { useWorkspaceStore } from "@/store/use-workspace.store";
import { Separator } from "../ui/separator";
import CreateWorkspace from "./create-workspace";
import { Workspace } from "@/types/workspace";

const WorkspaceButton = () => {

    const { data: workspaces, isLoading } = useWorkspaces();
    const { selectedWorkspace, setSelectedWorkspace } = useWorkspaceStore();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        // @ts-ignore
        if (workspaces && workspaces?.data.length > 0 && !selectedWorkspace) {
            // @ts-ignore
            setSelectedWorkspace(workspaces?.data[0]);
        }
    }, [workspaces, selectedWorkspace, setSelectedWorkspace])


    if (isLoading) return <Loader size={18} />

    if (!workspaces?.data || workspaces?.data?.length === 0) {
        return <div className="font-semibold text-orange-400">No Workspace</div>
    }

    return (
        <>
            <HintTooltip
                label="Change Workspace"
            >
                <Select
                    value={selectedWorkspace?.id}
                    onValueChange={(id) => {
                        const ws:Workspace = workspaces?.data?.find((item) => item?.id === id);
                        if (ws) setSelectedWorkspace(ws);
                    }}
                >
                    <SelectTrigger
                        className="border border-indigo-400 bg-indigo-400/10 hover:bg-indigo-400/20 text-indigo-400 hover:text-indigo-300 flex flex-row items-center space-x-1 text-xs"
                    >
                        <User size={4} className="text-indigo-400 hover:text-indigo-300" />
                        <span> <SelectValue placeholder="Select workspace" /> </span>
                    </SelectTrigger>
                    <SelectContent>
                        {workspaces?.data.map((ws) => (
                            <SelectItem key={ws?.id} value={ws?.id}>
                                {ws?.name}
                            </SelectItem>
                        ))}

                        {/* Create work-space */}
                        <Separator className="my-1" />

                        <div className="p-2 flex flex-row justify-between items-center">
                            <span className="text-sm font-semibold text-zinc-600">
                                My workspaces
                            </span>
                            <Button size={"icon"} variant={"outline"} onClick={() => setIsModalOpen((prev) => !prev)}>
                                <Plus size={12} className="text-indigo-400" />
                            </Button>

                        </div>
                    </SelectContent>
                </Select>
            </HintTooltip>
            <CreateWorkspace isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </>

    );
};

export default WorkspaceButton;
