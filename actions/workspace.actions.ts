"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "./auth.actions";
import { MEMBER_ROLE } from "@prisma/client";

/* 
initializeWorkspace
*/

export const initializeWorkspace = async () => {
    const user = await currentUser();

    if(!user?.id) {
        return {
            success: false,
            error: "User not found",
        }
    }

    try{
        const workspace = await prisma.workspace.upsert({
            where: {
                name_ownerId: {
                    ownerId: user?.id,
                    name: "Personal Workspace",
                }
            },
            update:{},
            create: {
                name: "Personal Workspace",
                description: "Default workspace for personal use",
                ownerId: user?.id,
                members:{
                    create:{
                        userId: user?.id,
                        role: MEMBER_ROLE.ADMIN,
                    },
                }
            },
            include:{
                members: true,
            }
        })

        return {
            success: true,
            message: "Workspace initialized successfully",
            data: workspace
        }
    }
    catch(err){
        console.error("Error while initializing a workspace: ", err);
        return {
            success: false,
            error: "Failed to initialize a workspace",
        }
    }
}

/* 
getWorkspace
*/
export const getWorkspaces = async () => {
    const user = await currentUser();

    if(!user?.id) {
        return {
            success: false,
            error: "User not found",
        }
    }

    try{
        const workspaces = await prisma.workspace.findMany({
            where: {
                OR:[
                    {ownerId: user?.id},
                    {members:{some:{userId: user?.id}}}
                ]
            },
            orderBy:{createdAt:"asc"}
        })
        return {
            success: true,
            message: "Workspaces fetched  successfully",
            data: workspaces
        }
    }
    catch(err){
        console.error("Error while fetching workspaces: ", err);
        return {
            success: false,
            error: "Failed to fetching workspaces",
        }
    }
}

/* 
createWorkspace
*/

export const createWorkspace = async (name: string) => {
    const user = await currentUser();

    if(!user?.id) {
        return {
            success: false,
            error: "User not found",
        }
    }

    try{
        const workspace = await prisma.workspace.create({
            data:{
                name,
                ownerId: user?.id,
                members:{
                    create:{
                        userId: user?.id,
                        role: MEMBER_ROLE.ADMIN
                    }
                }
            }
        })

        return {
            success: true,
            message: "Workspace created successfully",
            data: workspace
        }
    }
    catch(err){
        console.error("Error while creating a workspace: ", err);
        return {
            success: false,
            error: "Failed to create a workspace",
        }
    }

}


/* 
getWorkspaceById
*/
export const getWorkspaceById = async (id: string) => {
    const user = await currentUser();

    if(!user?.id) {
        return {
            success: false,
            error: "User not found",
        }
    }

    try{
        const workspace = await prisma.workspace.findUnique({
            where: {id},
            include:{
                members: true,
            }
        })

        return {
            success: true,
            message: "Workspace fetched successfully by id",
            data: workspace
        }
    }
    catch(err){
        console.error("Error while fetching a workspace by id: ", err);
        return {
            success: false,
            error: "Failed to get a workspace by id",
        }
    }
}