"use server";

import prisma from "@/lib/prisma";
import { Request } from "@/types/request";
import { sendRequest } from "@/utils/request/sendRequest";

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

/*  
* ---------------------------------------------------------- 
* API CALLING    
* ---------------------------------------------------------- 
*/

/* 
* RUN
*/
export const run = async (requestId: string) => {
    try{
        const request =  await prisma.request.findUnique({
            where: {id: requestId},
        }); 

        if(!request){
            return {
                success: false,
                error: `Failed to find request with requestid: ${requestId}`,
                data: null,
            }   
        }

				// requestConfiguration:
			  const requestConfig = {
					method: request.method,
					url: request.url,
					headers: request.headers as Record<string, string> || undefined,
					params: request.parameters as Record<string, any> || undefined,
					body: request.body || undefined
    		};

				const result = await sendRequest(requestConfig);

				const requestRun = await prisma.requestRun.create({
					data: {
						requestId: request.id,
						status: result.status || 0,
						statusText: result.statusText || (result.error ? 'Error' : null),
						headers: result.headers || "",
						body: result.data ? (typeof result.data === 'string' ? result.data : JSON.stringify(result.data)) : "",
						durationMs: result.duration || 0
					}
				})

				if(result.data && !result.error){
					await prisma.request.update({
						where: {id: requestId},
						data: {
							response: result.data,
							updatedAt: new Date(),
						}
					})
				}

				return {
					success: true,
					message: "Request run succesfully",
					data: result,
					requestRun:requestRun
				}
    }
    catch(error:any){

			try{
				// to catch the status code for the failed request:
				const failedRun = await prisma.requestRun.create({
					data: {
						requestId,
						status: 0,
						statusText: "Failed",
						headers: "",
						body: error.message,
						durationMs: 0
					}
				})

				return {
					success: false,
					error: error.message,
					data: null,
					requestRun:failedRun
				}
			}
			catch(dbError){
				return {
					success: false,
					error: `Request run failed: ${error.message}. DB saved failed: ${(dbError as Error).message}`,
					data: null,
					requestRun:null,
				}
			}
    }
} 

/* 
* Direct RUN: Run without saving the tab
*/
export async function runDirect(requestData: {
  id: string;
  method: string;
  url: string;
  headers?: Record<string, string>;
  parameters?: Record<string, any>;
  body?: any;
}) {
  try {
    const requestConfig = {
      method: requestData.method,
      url: requestData.url,
      headers: requestData.headers,
      params: requestData.parameters,
      body: requestData.body
    };

    const result = await sendRequest(requestConfig);

    const requestRun = await prisma.requestRun.create({
      data: {
        requestId: requestData.id,
        status: result.status || 0,
        statusText: result.statusText || (result.error ? 'Error' : null),
        headers: result.headers || "",
        body: result.data ? (typeof result.data === 'string' ? result.data : JSON.stringify(result.data)) : "",
        durationMs: result.duration || 0
      }
    });

    // Update request with latest response if successful
    if (result.data && !result.error) {
      await prisma.request.update({
        where: { id: requestData.id },
        data: {
          response: result.data,
          updatedAt: new Date()
        }
      });
    }

    return {
      success: true,
			message: "Request direct run successfull",
      data:result,
      requestRun: requestRun,
    };

  } catch (error: any) {
    const failedRun = await prisma.requestRun.create({
      data: {
        requestId: requestData.id,
        status: 0,
        statusText: 'Failed',
        headers: "",
        body: error.message,
        durationMs: 0
      }
    });

    return {
      success: false,
      error: error.message,
			data: null,
      requestRun: failedRun
    };
  }
}