import React, { useState } from "react";
import { Collapsible, CollapsibleTrigger } from "../ui/collapsible";
import { ChevronDown, ChevronRight, Edit, EllipsisVertical, FilePlus, Folder, Trash } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import EditCollectionModal from "./edit-collection";
import DeleteCollectionModal from "./delete-collection";

interface Props {
  collection: {
    id: string,
    name: string,
    createdAt: Date,
    workspaceId: string,
  }
}

const FoldersCollection = ({ collection }: Props) => {

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAddRequestOpen, setIsAddRequestOpen] = useState(false);

  return (
    <>
      <Collapsible open={isCollapsed} onOpenChange={setIsCollapsed} className="w-full">
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between items-center p-2 flex-1 w-full hover:bg-zinc-900 rounded-md">
            <CollapsibleTrigger className="flex flex-row justify-start items-center space-x-2 flex-1">
              <div className="flex items-center space-x-1">
                {
                  isCollapsed ?
                    <ChevronDown className="w-4 h-4 text-zinc-400" />
                    :
                    <ChevronRight className="w-4 h-4 text-zinc-400" />

                }
                <Folder className="w-5 h-5 text-zinc-400" />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-zinc-200 capitalize">
                  {collection?.name}
                </span>
                {/* {hasRequests && (
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                  <span className="text-xs text-zinc-400">
                    ({requestData.length})
                  </span>
                </div>
              )} */}
              </div>
            </CollapsibleTrigger>

            <div className="flex flex-row justify-center items-center space-x-2">
              <FilePlus
                className="size-4 text-zinc-400 hover:text-indigo-400"
                onClick={() => setIsAddRequestOpen(true)}
              />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-1 hover:bg-zinc-800 rounded">
                    <EllipsisVertical className="w-4 h-4 text-zinc-400 hover:text-indigo-400" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuItem
                    onClick={() => setIsAddRequestOpen(true)}
                  >
                    <div className="flex flex-row justify-between items-center w-full">
                      <div className="font-semibold flex justify-center items-center">
                        <FilePlus className="text-green-400 mr-2 w-4 h-4" />
                        Add Request
                      </div>
                      <span className="text-xs text-zinc-400 bg-zinc-700 px-1 rounded">
                        ⌘R
                      </span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setIsEditOpen(true)}
                  >
                    <div className="flex flex-row justify-between items-center w-full">
                      <div className="font-semibold flex justify-center items-center">
                        <Edit className="text-blue-400 mr-2 w-4 h-4" />
                        Edit
                      </div>
                      <span className="text-xs text-zinc-400 bg-zinc-700 px-1 rounded">
                        ⌘E
                      </span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setIsDeleteOpen(true)}
                  >
                    <div className="flex flex-row justify-between items-center w-full">
                      <div className="font-semibold flex justify-center items-center">
                        <Trash className="text-red-400 mr-2 w-4 h-4" />
                        Delete
                      </div>
                      <span className="text-xs text-zinc-400 bg-zinc-700 px-1 rounded">
                        ⌘D
                      </span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

            </div>

          </div>

        </div>
      </Collapsible>

      {/* Edit collections */}
      <EditCollectionModal
        isModalOpen={isEditOpen}
        setIsModalOpen={setIsEditOpen}
        collectionId={collection.id}
        initialName={collection.name}
      />

      {/* Delete collections */}
      <DeleteCollectionModal
        isModalOpen={isDeleteOpen}
        setIsModalOpen={setIsDeleteOpen}
        collectionId={collection.id}
      />
    </>
  );
};

export default FoldersCollection;
