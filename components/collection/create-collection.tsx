import React, { useState } from "react";
import Modal from "../common/modal";
import { useCreateCollections } from "@/hooks/use-collection.hook";
import { toast } from "sonner";

const CreateCollection = ({ workspaceId, isModalOpen, setIsModalOpen }: {
  workspaceId: string,
  isModalOpen: boolean,
  setIsModalOpen: (open: boolean) => void
}) => {
  const [name, setName] = useState("");

  const { mutateAsync, isPending } = useCreateCollections(workspaceId);

  const handleSubmit = async () => {
    if (!name.trim()) return;
    try {
      await mutateAsync(name);
      toast.success("Collection created successfully");
      setName("");
      setIsModalOpen(false);
    } catch (err) {
      toast.error("Failed to create collection");
      console.error("Failed to create collection:", err);
    }
  };

  return (
    <Modal
      title="Add New Collection"
      description="Create a new collection to organize your projects"
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onSubmit={handleSubmit}
      submitText={isPending ? "Creating..." : "Create Collection"}
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

export default CreateCollection;
