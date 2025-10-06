import { RequestTab } from "@/types/request";
import React from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { requestColorMap } from "@/constant/requestsColor";
import { REST_METHOD } from "@prisma/client";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Save, Send } from "lucide-react";

interface Props {
	tab: RequestTab;
	updateTab: (id: string, data: Partial<RequestTab>) => void;
	handleSaveRequest: () => void;
}

const RequestBar = ({ tab, updateTab,handleSaveRequest  }: Props) => {

	const onSendRequest = ()=>{}

	return (
		<div className="flex flex-row items-center justify-between bg-zinc-900 rounded-md p-2 w-full">
			<div className="flex flex-row items-center gap-2 flex-1">
				<Select
					value={tab?.method}
					onValueChange={(value) => updateTab(tab.id, { method: value })}
				>
					<SelectTrigger className={`w-24 ${requestColorMap[tab.method as REST_METHOD] ?? "text-gray-500"}`}>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectItem value="GET" className="text-green-500">GET</SelectItem>
							<SelectItem value="POST" className="text-blue-500">POST</SelectItem>
							<SelectItem value="PUT" className="text-yellow-500">PUT</SelectItem>
							<SelectItem value="DELETE" className="text-red-500">DELETE</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>

				<Input
					value={tab?.url ?? ""}
					onChange={(e) => updateTab(tab?.id, {url: e.target.value})}
					placeholder="Enter URL"
					className="flex-1"
				/>
				<Button
					type="submit"
					onClick={onSendRequest}
					// disabled={isPending || !tab.url}
					disabled={!tab.url}
					className="ml-2 text-white font-semibold text-sm bg-indigo-500 hover:bg-indigo-600"
				>
					<Send size={16}/> Send
				</Button>
				<Button
					type="submit"
					onClick={handleSaveRequest}
					disabled={!tab?.unsavedChanges}
					variant={"outline"}
					className="cursor-pointer"
				>
					<Save size={16}/>
				</Button>
			</div>
		</div>
	);
};

export default RequestBar;
