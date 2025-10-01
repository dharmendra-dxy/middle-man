import React from "react";
import { Button } from "../ui/button";
import { UserPlus } from "lucide-react";
import { HintTooltip } from "../common/hint-tooltip";

const InviteMember = () => {
  return(
    <HintTooltip
        label="Invite members"
    >
    <Button className="border border-green-400 bg-green-400/10 hover:bg-green-400/20 text-green-400 hover:text-green-300 ">
        <UserPlus className="size-4 text-green-400"/>
    </Button>
    </HintTooltip>
  );
};

export default InviteMember;
