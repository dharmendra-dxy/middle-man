"use client";

import RealtimeConnectionBar from "@/components/realtime/realtime-connection-bar";
import RealtimeMessageEditor from "@/components/realtime/realtime-message-editor";
import React from "react";

const Page = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-6 space-y-2">
        <h1 className="text-2xl font-bold">WebSocket</h1>
        <p className="text-sm text-muted-foreground">
          Connect to a websocket server and start testing
        </p>

        <RealtimeConnectionBar/>
      </div>

      <div className="flex-1 overflow-auto flex flex-col px-6 pb-6">
        <RealtimeMessageEditor/>
      </div>

    </div>
  )
};

export default Page;
