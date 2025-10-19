import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserPlus, Copy, Link as LinkIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { HintTooltip } from "../common/hint-tooltip";
import { useWorkspaceStore } from "@/store/use-workspace.store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGenerateWorkspaceInvite, useGetWorkspaceMemebers } from "@/hooks/use-invite.hook"; 

const InviteMember = () => {
  const [inviteLink, setInviteLink] = useState("");
  const { selectedWorkspace } = useWorkspaceStore();

  const { mutateAsync, isPending } = useGenerateWorkspaceInvite(selectedWorkspace?.id || "");
  const { data, isLoading } = useGetWorkspaceMemebers(selectedWorkspace?.id || "");

  const workspaceMembers = data?.data;

  /* generateInviteLink  */
  const generateInviteLink = async () => {
    if (!selectedWorkspace?.id) {
      toast.error("Please select a workspace first");
      return;
    }
    try {
      const response = await mutateAsync();
      setInviteLink(response?.url!);
      toast.success("Invite link generated!");
    } catch (error) {
      toast.error("Failed to generate invite link");
    }
  };

  /* copyToClipboard */
  const copyToClipboard = async () => {
    if (inviteLink) {
      await navigator.clipboard.writeText(inviteLink);
      toast.success("Invite link copied to clipboard");
    }
  };


  return (
    <DropdownMenu>
      <HintTooltip label="Invite Member">
        <DropdownMenuTrigger asChild>
          <Button className="border border-emerald-400 bg-emerald-400/10 hover:bg-emerald-400/20 text-emerald-400 hover:text-emerald-300">
            <UserPlus className="size-4 text-emerald-400" />
          </Button>
        </DropdownMenuTrigger>
      </HintTooltip>

      <DropdownMenuContent className="w-80 rounded-xl" align="end">
        <div className="p-4">
          <DropdownMenuLabel>Invite to {selectedWorkspace?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {/* Members Avatars */}
          <div className="flex -space-x-2 overflow-hidden mb-3">
            {isLoading ? (
              <p className="text-xs text-muted-foreground">Loading members...</p>
            ) : (
              workspaceMembers?.map((member: any) => (
                <HintTooltip key={member.id} label={member.user.name || "Unknown User"}>
                  <Avatar className="border-2 border-background size-8 mt-2">
                    <AvatarImage src={member.user.image || ""} />
                    <AvatarFallback>
                      {member.user.name?.charAt(0) || "?"}
                    </AvatarFallback>
                  </Avatar>
                </HintTooltip>
              ))
            )}
          </div>

          {/* Invite Link Input */}
          <div className="flex gap-2 items-center">
            <Input
              value={inviteLink}
              placeholder="Generate an invite link..."
              readOnly
            />
            <Button
              variant="outline"
              size="icon"
              onClick={copyToClipboard}
              disabled={!inviteLink}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>

          {/* Generate Button */}
          <Button
            className="mt-3 w-full bg-emerald-500 hover:bg-emerald-600 text-white"
            onClick={generateInviteLink}
            disabled={isPending}
          >
            <LinkIcon className="h-4 w-4 mr-2" />
            {isPending ? "Generating..." : "Generate Link"}
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default InviteMember;
