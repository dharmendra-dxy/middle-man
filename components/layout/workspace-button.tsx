"use client";

import React, { useEffect } from "react";
import { HintTooltip } from "../common/hint-tooltip";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { User } from "lucide-react";
import { useWorkspaces } from "@/hooks/workspace/use-workspace";
import Loader from "../common/loader";
import { useWorkspaceState } from "@/store";

const WorkspaceButton = () => {

    const {data:workspaces, isLoading} = useWorkspaces();
    const {selectedWorkspace, setSelectedWorkspace} = useWorkspaceState();

    console.log("ws: ", workspaces?.data)

    useEffect(()=>{
        // @ts-ignore
        if(workspaces && workspaces?.data.length>0 && !selectedWorkspace){
            // @ts-ignore
            setSelectedWorkspace(workspaces?.data[0]);
        }
    }, [])


    if(isLoading) return <Loader size={18}/>

    if(!workspaces?.data || workspaces?.data?.length===0){
        return <div className="font-semibold text-orange-400">No Workspace</div>
    }

    return (
        <HintTooltip
            label="Change Workspace"
        >
            <Select
                value={selectedWorkspace?.id}
                onValueChange={(id)=> {
                    const ws = workspaces?.data?.find((item) => item?.id===id);
                    if(ws) setSelectedWorkspace(ws);
                }}
            >
                <SelectTrigger
                className="border border-indigo-400 bg-indigo-400/10 hover:bg-indigo-400/20 text-indigo-400 hover:text-indigo-300 flex flex-row items-center space-x-1 text-xs"
                >
                    <User size={4} className="text-indigo-400 hover:text-indigo-300"/> 
                    <span> <SelectValue placeholder="Select workspace" /> </span>
                </SelectTrigger>
                <SelectContent>
                    {workspaces?.data.map((ws) =>(
                        <SelectItem key={ws?.id} value={ws?.id}>
                            {ws?.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

        </HintTooltip>
    );
};

export default WorkspaceButton;
