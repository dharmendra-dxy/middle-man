"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "./auth";

/* 
* createCollection
*/
export const createCollection = async (name: string, workspaceId:string) => {
    const user = await currentUser();
    if(!user?.id) {
        return {
            success: false,
            error: "User not found",
        }
    }

    try{
        const collection = await prisma.collection.create({
            data:{
                name,
                workspace:{
                    connect:{id:workspaceId}
                }
            }
        })

        return{
            success: true,
            message: "Collection created successfully",
            data: collection
        }
    }
    catch(err){
        console.error("Error while creating collection: ", err);
        return {
            success: false,
            error: "Failed to create collection",
            data: null,
        }
    }
}

/* 
* GetCollection
*/
export const getCollections = async (workspaceId:string) => {
    const user = await currentUser();
    if(!user?.id) {
        return {
            success: false,
            error: "User not found",
        }
    }

    try{
        const collections = await prisma.collection.findMany({
            where: {workspaceId}
        })

        return{
            success: true,
            message: "Collection fetched successfully",
            data: collections
        }
    }
    catch(err){
        console.error("Error while fetching collection: ", err);
        return {
            success: false,
            error: "Failed to fetch collection",
            data: null,
        }
    }
}

/* 
* deleteCollection
*/
export const deleteCollection = async (id:string)=>{
    const user = await currentUser();
    if(!user?.id) {
        return {
            success: false,
            error: "User not found",
        }
    }

    try{
        const collection = await prisma.collection.delete({
            where: {id}
        })

        return{
            success: true,
            message: "Collection deleted successfully",
            data: collection
        }
    }
    catch(err){
        console.error("Error while deleting collection: ", err);
        return {
            success: false,
            error: "Failed to delete collection",
            data: null,
        }
    }
}

/* 
* editCollection
*/
export const editCollection = async (collectionId:string, name: string)=>{
    const user = await currentUser();
    if(!user?.id) {
        return {
            success: false,
            error: "User not found",
        }
    }

    try{
        const collection = await prisma.collection.update({
            where: {id: collectionId},
            data:{
                name,
            }
        })

        return{
            success: true,
            message: "Collection updated successfully",
            data: collection
        }
    }
    catch(err){
        console.error("Error while updating collection: ", err);
        return {
            success: false,
            error: "Failed to update collection",
            data: null,
        }
    }
}