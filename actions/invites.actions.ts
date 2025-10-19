"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "./auth.actions";
import { MEMBER_ROLE } from "@prisma/client";
import { randomBytes } from "crypto";

/* Create Workspace-invite */
export const generateWorkspaceInvite = async (workspaceId: string) => {
  const token = randomBytes(16).toString("hex");

  const user = await currentUser();
  if(!user) {
    return {
      success: false,
      error: "User not found",
      data: null,
    }
  }

  const invites = await prisma.workspaceInvite.create({
    data: {
      workspaceId,
      token,
      createdById:user?.id,
      expiresAt: new Date(Date.now() + 1000*60*60*24*7),

    }
  })

  return {
    success: true,
    message: "Workspace invite generated succesfully",
    url: `${process.env.NEXT_PUBLIC_APP_URL}/invites/${invites.token}`,
  }
}


/* accept workspace-invite */
export const acceptWorkspaceInvite = async (token:string) => {
  const user = await currentUser();
  if(!user) {
    return {
      success: false,
      error: "User not found",
    }
  }

  const invite = await prisma.workspaceInvite.findUnique({
    where: {token}
  });

  if(!invite) {
    return {
      success: false,
      error: "Invalid invite",
    }
  }

  if(!invite.expiresAt || invite.expiresAt<new Date()){
    return {
      success: false,
      error: "Invite Expired",
    }
  }

  // Add the user in workspace-member:
  await prisma.workspaceMember.create({
    data: {
      userId: user?.id, 
      workspaceId: invite.workspaceId,
      role: MEMBER_ROLE.VIEWER,
    }
  })

  // delete the invite url:
  await prisma.workspaceInvite.delete({
    where: {id:invite.id},
  });

  return {
    success: true,
    message: "Invite accepted Succesfully",
  }
}


/* show all workspace-members */
export const getAllWorkspaceMember = async (workspaceId: string) => {
  const members = await prisma.workspaceMember.findMany({
    where: {workspaceId},
    include: {
      user:true,
    }
  });

  if(!members){
    return {
      success: false,
      message: "Failed to fetched members",
      data:null,
    }
  }

  return {
    success: true,
    message: "Members fetched succesfully",
    data:members
  }
}