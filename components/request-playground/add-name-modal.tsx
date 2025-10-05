import { useRequestPlaygroundStore } from "@/store/use-request.store";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Modal from "../common/modal";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Sparkles } from "lucide-react";

interface Props {
	isModalOpen: boolean;
	setIsModalOpen: (open: boolean) => void;
	tabId: string;
}

const AddNameModal = ({
	isModalOpen,
	setIsModalOpen,
	tabId
}: Props) => {

	const { updateTab, tabs, markUnsaved } = useRequestPlaygroundStore();
	const tab = tabs.find((t) => t.id === tabId);

	const [name, setName] = useState(tab?.title ?? "Untitled");

	useEffect(() => {
		if (tab) setName(tab?.title);
	}, [tabId])

	const handleSubmit = () => {
		if (!name.trim()) return;
		try {
			updateTab(tabId, { title: name })
			markUnsaved(tabId, true);
			toast.success("Request name updated");
			setIsModalOpen(false);
		}
		catch (err) {
			console.error("Failed to update request name ", err);
			toast.error("Failed to update request name");
		}
	}


	return (
		<div>
			<Modal
				title="Rename Request"
				description="Give your request a name"
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSubmit={handleSubmit}
				submitText="Save"
				submitVariant="default"
			>
				<div className="flex flex-col gap-4">
					<div className="flex flex-row items-center justify-center gap-2">
						<Input
							className="w-full p-2 border rounded bg-zinc-900 text-white"
							placeholder="Request Name..."
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
				</div>
			</Modal>

		</div>
	)
};

export default AddNameModal;
