import { requestColorMap } from "@/constant/requestsColor";
import { useRequestPlaygroundStore } from "@/store/use-request.store";
import { REST_METHOD } from "@prisma/client";
import { Dot, Plus, X } from "lucide-react";
import React, { useState } from "react";
import AddNameModal from "./add-name-modal";

const TabBar = () => {

	const { tabs, activeTabId, addTab, closeTab, setActiveTab } = useRequestPlaygroundStore();
	const [renameModelOpen, setRenameModelOpen] = useState<boolean>(false);
	const [selectedTabId, setSelectedTabId] = useState<string | null>(null);


	const onDoubleClick = (tabId: string) => {
		console.log("hello");
		setSelectedTabId(tabId);
		setRenameModelOpen(true);
	}

	return (

		<div className="flex items-center border-b border-zinc-800 bg-zinc-900">
			{
				tabs.map((tab) => (
					<button
						key={tab.id}
						onDoubleClick={() => onDoubleClick(tab.id)}
						onClick={() => setActiveTab(tab?.id)}
						className={`group flex px-4 py-2 items-center gap-2 cursor-pointer ${activeTabId === tab?.id ? "bg-zinc-800 text-white border-t-2 border-green-500 mx-2 my-2" : "text-zinc-400 hover:text-white"} `}
					>
						<span className={`font-semibold text-xs ${requestColorMap[tab?.method as REST_METHOD] ?? "text-gray-500"}`}>
							{tab.method}
						</span>

						<p className="max-w-xs text-xs truncate font-semibold flex items-center gap-1">
							{tab.title}
							{tab.unsavedChanges && (
								<span className="text-red-500 group-hover:hidden transition-all ease-in-out
                "> <Dot size={16} /> </span>
							)}
						</p>

						<X
							className="hidden group-hover:inline w-4 h-4 ml-2 hover:text-red-500 transition-all ease-in-out"
							onClick={(e) => {
								e.stopPropagation();
								closeTab(tab.id);
							}}
						/>
					</button>
				))
			}
			<button
				onClick={addTab}
				className="px-3 py-2 text-zinc-400 hover:text-white"
			>
				<Plus size={16} />
			</button>

			{
				selectedTabId && 
				<AddNameModal
					isModalOpen={renameModelOpen}
					setIsModalOpen={setRenameModelOpen}
					tabId={selectedTabId}
				/>
			}
		</div>

	);
};

export default TabBar;
