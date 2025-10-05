"use client";

import { useSaveRequest } from "@/hooks/use-request.hook";
import { useRequestPlaygroundStore } from "@/store/use-request.store";
import React, { useState } from "react";
import WelcomePage from "./welcome-page";
import TabBar from "./tab-bar";
import { useHotkeys } from "react-hotkeys-hook";
import { toast } from "sonner";
import RequestEditor from "./request-editor";

const RequestPlayground = () => {


  const { tabs, activeTabId, addTab } = useRequestPlaygroundStore();
  const activeTab = tabs.find((t) => t.id == activeTabId);

  const { mutateAsync, isPending } = useSaveRequest(activeTab?.requestId!);

  const [showSaveModal, setShowSaveModal] = useState(false);


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

  }, [])


  if (!activeTab) return <WelcomePage />

  return (
    <div className="flex flex-col h-full">
      <TabBar />

      <div className="flex-1 overflow-auto">
        <RequestEditor />
      </div>
    </div>
  );
};

export default RequestPlayground;
