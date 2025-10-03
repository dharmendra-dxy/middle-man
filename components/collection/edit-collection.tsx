import React, { useState } from "react";
import Modal from "../common/modal";
import { useEditCollections } from "@/hooks/use-collection.hook";
import { toast } from "sonner";

interface Props {
    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;
    collectionId: string;
    initialName: string;
}

const EditCollectionModal = ({
    isModalOpen,
    setIsModalOpen,
    collectionId,
    initialName
}: Props) => {

    const [name, setName] = useState(initialName);
    const { mutateAsync, isPending } = useEditCollections(collectionId, name)

    const handleSubmit = async () => {
        try {
            await mutateAsync();
            toast.success("Collection updated successfully");
            setIsModalOpen(false);
        }
        catch (err) {
            toast.error("Failed to update collection");
            console.error("Failed to update collection:", err);
        }
    }

    return (
        <Modal
            title="Edit Collection"
            description="Rename your collection"
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleSubmit}
            submitText={isPending ? "Saving..." : "Save Changes"}
            submitVariant="default"
        >
            <div className="space-y-4">
                <input
                    className="w-full p-2 border rounded"
                    placeholder="Collection name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
        </Modal>
    );
};

export default EditCollectionModal;
