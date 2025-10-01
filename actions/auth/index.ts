"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export const currentUser = async () => {
    try{
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if(!session?.user?.id){
            return null;
        }

        const user = await prisma.user.findUnique({
            where: {id: session?.user?.id},
            select: {
                id: true,
                email: true,
                name: true,
                image: true,
                createdAt: true,
                updatedAt: true
            }
        });

        return user;
    }
    catch(err){
        console.error("Error while fetching the user: ", err);
        return null;
    }
}