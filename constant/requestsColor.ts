import { REST_METHOD } from "@prisma/client";

export const requestColorMap: Record<REST_METHOD, string> = {
	[REST_METHOD.GET]: "text-green-500",
	[REST_METHOD.POST]: "text-indigo-500",
	[REST_METHOD.PUT]: "text-yellow-500",
	[REST_METHOD.DELETE]: "text-red-500",
	[REST_METHOD.PATCH]: "text-orange-500",
};