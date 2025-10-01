"use client";

import React from "react";
import { HintTooltip } from "../common/hint-tooltip";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { User } from "lucide-react";

const WorkspaceButton = () => {
    return (
        <HintTooltip
            label="Change Workspace"
        >
            <Button className="border border-indigo-400 bg-indigo-400/10 hover:bg-indigo-400/20 text-indigo-400 hover:text-indigo-300 flex flex-row items-center space-x-1 text-xs">
                <User size={4}/> 
                Personal workspace
            </Button>

        </HintTooltip>
    );
};

export default WorkspaceButton;
