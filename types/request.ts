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