"use server";

import prisma from "@/lib/prisma";
import { Request } from "@/types/request";

/* 
* Create a new Request -> and it should be save to collections
*/

export const addRequestToCollection  = async (collectionId: string, value:Request) => {
    try{
        const request = await prisma.request.create({
					data: {
						name: value.name,
						method: value?.method,
						url: value?.url,
						parameters: value?.parameters,
						headers: value?.headers,
						body: value?.body,
						collectionId
					}
				});
				return {
            success: true,
            message: "Added request to collection",
            data: request,
        }
    }
    catch(err){
        console.error("Failed to add request to collection ", err);
        return {
            success: false,
            error: "Failed to add request to collection",
            data: null,
        }
    }
}


/* 
* Save a Request
* use-case: save request when user wants to save (ctrl + S)
* We can save only the requests which are already added to a collection
*/

export const saveRequest  = async (id: string, value:Request) => {
    try{
        const request = await prisma.request.update({
					where: {id},
					data: {
						name: value.name,
						method: value?.method,
						url: value?.url,
						parameters: value?.parameters,
						headers: value?.headers,
						body: value?.body,
					}
				});
				return {
            success: true,
            message: "Saved request succesfully",
            data: request,
        }
    }
    catch(err){
        console.error("Failed to save request", err);
        return {
            success: false,
            error: "Failed to save request",
            data: null,
        }
    }
}

/* 
* getAllRequestFromCollection
*/

export const getAllRequestFromCollection = async (collectionId: string) => {
	try{
        const requests = await prisma.request.findMany({
					where: {collectionId},
				})
				return {
          success: true,
          message: "Fetched request from collection succesfully",
          data: requests,
        }
    }
    catch(err){
        console.error("Failed to fetch request from collection", err);
        return {
          success: false,
          error: "Failed to fetch request from collection",
          data: null,
        }
    }

}