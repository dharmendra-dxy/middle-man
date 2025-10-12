import { REST_METHOD } from "@prisma/client";

export type Request = {
    name: string;
    method: REST_METHOD;
    url: string;
    body?: string;
    headers?: string;
    parameters?: string;
}

export interface RequestTab {
    id: string;
    title: string;
    method: string;
    url: string;
    body?: string;
    headers?: string;
    parameters?: string;
    unsavedChanges?: boolean;
    requestId?: string;
    collectionId?: string;
    workspaceId?: string;
}

export interface SavedRequest {
  id: string;
  name: string;
  method: string;
  url: string;
  body?: string;
  headers?: string;
  parameters?: string;
}


/* 
* ---------------------------------------------
*                      Request - response data
* --------------------------------------------- 
*/

export type HeadersMap = Record<string, string>;
export interface RequestRun {
  id: string;
  requestId?: string;
  status?: number;
  statusText?: string;
  headers?: HeadersMap;
  body?: string | object | null;
  durationMs?: number;
  createdAt?: string;
}
export interface Result {
  status?: number;
  statusText?: string;
  duration?: number;
  size?: number;
}

export interface ResponseData {
  success: boolean,
  requestRun: RequestRun;
  result? :Result;
}