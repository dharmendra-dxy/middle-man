"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { useWorkspaceStore } from "@/store/use-workspace.store";
import { useGetWorkspace } from "@/hooks/use-workspace.hook";
import Loader from "@/components/common/loader";
import TabbedSidebar from "@/components/collection/tabbed-sidebar";
import RequestPlayground from "@/components/request-playground/request-playground";

export default function Home() {

  const { selectedWorkspace } = useWorkspaceStore();
  const { data, isPending } = useGetWorkspace(selectedWorkspace?.id!);

  const currentWorkspace = data?.data;

  if (isPending) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  return (
    <section>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={65}>
          <RequestPlayground/>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={35} maxSize={40} minSize={20}>
          <div className="flex-1">
              {/* @ts-ignore */}
              <TabbedSidebar currentWorkspace={currentWorkspace}/>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </section>
  );
}
