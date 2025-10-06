"use client";

import { useSaveRequest } from "@/hooks/use-request.hook";
import { useRequestPlaygroundStore } from "@/store/use-request.store";
import React, { act, useState } from "react";
import WelcomePage from "./welcome-page";
import TabBar from "./tab-bar";
import { useHotkeys } from "react-hotkeys-hook";
import { toast } from "sonner";
import RequestEditor from "./request-editor";
import { REST_METHOD } from "@prisma/client";
import AddRequestModal from "../collection/add-request";

const RequestPlayground = () => {


  const { tabs, activeTabId, addTab } = useRequestPlaygroundStore();
  const activeTab = tabs.find((t) => t.id == activeTabId);

  const { mutateAsync, isPending } = useSaveRequest(activeTab?.requestId!);

  const [showSaveModal, setShowSaveModal] = useState(false);

  const getCurrentRequestData = () => {
    if (!activeTab) return {
      name: "Untitled",
      method: REST_METHOD.GET as REST_METHOD,
      url: "https://echo.hoppscoth.io"
    }

    return {
      name: activeTab.title ?? "Untitled Request",
      method: (activeTab.method as REST_METHOD) ?? REST_METHOD.GET,
      url: activeTab.url ?? "https://echo.hoppscotch.io"
    };
  }


  /* 
  * Hot Keys
  */
  useHotkeys("ctrl+g, meta+shift+g", (e) => {
    e.preventDefault();
    e.stopPropagation();

    addTab();
    toast.success("New request added")
  }, {
    preventDefault: true,
    enableOnFormTags: true,
  }, []);

  const handleSaveRequest = async () => {
    if (!activeTab) {
      toast.error("Please select a tab before saving");
    }

    if (activeTab?.collectionId) {
      try {
        await mutateAsync({
          url: activeTab.url ?? "https://echo.hoppscoth.io",
          method: activeTab.method as REST_METHOD,
          name: activeTab.title ?? "Untitled",
          body: activeTab?.body,
          headers: activeTab?.headers,
          parameters: activeTab?.parameters
        });
        toast.success("Request saved successfully")
      }
      catch (err) {
        console.error("Failed to save request ", err);
        toast.error("Failed to save request")
      }
    }
    else {
      setShowSaveModal(true);
    }
  }

  useHotkeys("ctrl+s, meta+shift+s", async (e) => {
    e.preventDefault();
    e.stopPropagation();

    handleSaveRequest();

  }, {
    preventDefault: true,
    enableOnFormTags: true,
  }, [activeTab]);


  if (!activeTab) return <WelcomePage />

  return (
    <div className="flex flex-col h-full">
      <TabBar />

      <div className="flex-1 overflow-auto">
        <RequestEditor handleSaveRequest={handleSaveRequest}/>
      </div>

      {/* Model : saveRequestToCollections */}
      <AddRequestModal
        isModalOpen={showSaveModal}
        setIsModalOpen={setShowSaveModal}
        initialName={getCurrentRequestData().name}
        requestData={getCurrentRequestData()}
      />
    </div>
  );
};

export default RequestPlayground;
