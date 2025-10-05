import { useCollections } from "@/hooks/use-collection.hook";
import { Workspace } from "@/types/workspace";
import React, { useState } from "react";
import Loader from "../common/loader";
import { Archive, Clock, Code, ExternalLink, HelpCircle, Plus, Search, Share2 } from "lucide-react";
import { Button } from "../ui/button";
import CreateCollection from "./create-collection";
import EmptyCollection from "./empty-collection";
import FoldersCollection from "./folders-collection";

const TabbedSidebar = ({ currentWorkspace }: { currentWorkspace: Workspace }) => {

  const { data, isPending } = useCollections(currentWorkspace?.id);

  const [activeTab, setActiveTab] = useState("Collections");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const collections = data?.data;
  const sidebarItems = [
    { icon: Archive, label: "Collections" },
    { icon: Clock, label: "Clock" },
    { icon: Share2, label: "Share" },
    { icon: Code, label: "Code" }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case "Collections":
        return (
          <div className="h-full bg-zinc-950 text-zinc-100 flex flex-col">

            {/* Heading and basic actions */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-800">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-zinc-400">{currentWorkspace?.name}</span>
                <span className="text-zinc-600"> {">"} </span>
                <span className="text-sm font-medium">Collections</span>
              </div>

              <div className="flex items-center space-x-2">
                <HelpCircle className="size-4 text-zinc-400 hover:text-zinc-300 cursor-pointer" />
                <ExternalLink className="size-4 text-zinc-400 hover:text-zinc-300 cursor-pointer" />
              </div>
            </div>

            {/* Search input */}
            <div className="p-4 border-b border-zinc-800">
              <div className="relative">
                <Search className="absolute size-4 left-3 top-1/2 transform -translate-y-1/2 text-zinc-400"/>
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg pl-10 pr-4 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Add new Collection button */}
            <div className="p-4 border-b border-zinc-800 text-zinc-400">
              <Button variant={"ghost"} onClick={()=> setIsModalOpen((prev) => !prev)}>
                <Plus className="size-4"/>
                <span>New</span>
              </Button>
            </div>

            {/* Display Folder collections */}
            {
              collections && collections.length>0 ? (
                collections.map((collection) => (
                  <div 
                    key={collection?.id}
                    className=" flex flex-col justify-start items-start p-3 border-b border-zinc-800 w-full"
                  >
                    <FoldersCollection collection={collection}/>
                  </div>
                ))
              ) : <EmptyCollection/>
            }

          </div>
        )

      default:
        return <div className="p-4 text-zinc-400">
          Select a tab to view content
        </div>
    }
  }


  if (isPending) return <Loader />

  return (
    <div className="flex h-screen bg-zinc-900 ">
      {/* Sidebar */}
      <div className="w-12 bg-zinc-900 border-r border-zinc-800 flex flex-col items-center py-4 space-y-4">
        {sidebarItems.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(item.label)}
            className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${activeTab === item.label
              ? 'bg-indigo-600 text-white'
              : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800'
              }`}
          >
            <item.icon className="w-4 h-4" />
          </button>
        ))}
      </div>

      <div className="flex-1 bg-zinc-900 overflow-y-auto">{renderTabContent()}</div>
      
      <CreateCollection workspaceId={currentWorkspace?.id} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
    </div>
  );
};

export default TabbedSidebar;
