import { REST_METHOD } from "@prisma/client";

export type Request = {
    name: string;
    method: REST_METHOD;
    url: string;
    body?: string;
    headers?: string;
    parameters?: string;
}