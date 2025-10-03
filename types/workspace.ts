import { MEMBER_ROLE } from "@prisma/client";
export interface Workspace {
    id: string;
    name: string;
    description?: string
    createdAt?: Date; 
    updatedAt?: Date;
    members?:{ 
        id: string; 
        workspaceId: string; 
        createdAt: Date; 
        updatedAt: Date; 
        role: MEMBER_ROLE; 
        userId: string; 
    }[]
}