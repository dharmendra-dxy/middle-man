import React from "react";
import { create } from "zustand";
import { nanoid } from "nanoid";
import { RequestTab, SavedRequest } from "@/types/request";

type PlaygroundState = {
    tabs: RequestTab[];
    activeTabId: string|null;
    addTab: ()=> void;
    closeTab: (id: string)=> void;
    setActiveTab: (id: string) => void;
    updateTab: (id: string, data:Partial<RequestTab>) => void;
    markUnsaved: (id:string, value:boolean) => void;
    openRequestTab: (req:any) => void;
    updateTabFromSavedRequest: (tabId: string, savedRequest: SavedRequest) => void;
    // responseViewerData: ResponseData| null;
    // setResponseViewerData: (data: ResponseData) => void;
}

// @ts-ignore
export const useRequestPlaygroundStore = create<PlaygroundState>((set) => ({
    tabs: [],
		activeTabId: null,

		/* addTab : to add a new tab in tabs[] and set activeTabId */
		addTab: ()=>{
			set((state)=> {
				const newTab:RequestTab = {
					id: nanoid(),
					title: "Untitled",
					method: "GET",
					url: "",
					body: "",
					headers: "",
					parameters: "",
					unsavedChanges: true,
				};
				return {
					tabs: [...state.tabs, newTab],
					activeTabId: newTab?.id,
				}
			})
		},

		/* closeTab: remove the particular tab from tabs[] and change activeTabId */
		closeTab: (id: string) => {
			set((state) => {
				const newTabs = state.tabs.filter((t) => t.id !== id);
				const newActiveTabId = state.activeTabId===id && newTabs.length>0 
				? newTabs[0]?.id :state.activeTabId;

				return {
					tabs: newTabs,
					activeTabId: newActiveTabId
				}
			})
		},

		/* setActiveTab */
		setActiveTab: (id:string) => set({activeTabId: id}),


		/* updateTab: update the particular tab */
		updateTab: (id:string, data:Partial<RequestTab>) => {
			set((state) => ({
				tabs: state.tabs.map((t) => t.id===id ? {...t, ...data, unsavedChanges:true}: t)
			}))
		},

		/* markUnsaved: to save/unsave */
		markUnsaved: (id:string, value:boolean) => {
			set((state) => ({
				tabs: state.tabs.map((t) => t.id===id ? {...t, unsavedChanges:value}: t)
			}))
		},

		/* 
			* openRequestTab: to open or make a particluar tab active 
			* usecase: to click and open request from collection to playground
		*/
		openRequestTab: (req) =>
    set((state) => {

      // check if tab is already open
      const existing = state.tabs.find((t) => t.requestId === req.id);
      if (existing) {
        return { activeTabId: existing.id };
      }

      const newTab: RequestTab = {
        id: nanoid(),
        title: req.name ?? "Untitled",
        method: req.method,
        url: req.url,
        body: req.body,
        headers: req.headers,
        parameters: req.parameters,
        requestId: req.id,
        collectionId: req.collectionId,
        workspaceId: req.workspaceId,
        unsavedChanges: false,
      };

      return {
        tabs: [...state.tabs, newTab],
        activeTabId: newTab.id,
      };
    }),

		/* updateTabFromSavedRequest: to update the tab */
		updateTabFromSavedRequest: (tabId: string, savedRequest: SavedRequest) => 
			set((state) => ({
				tabs: state.tabs.map((t) =>
					t.id === tabId
						? {
								...t,
								id: savedRequest.id,
								title: savedRequest.name,
								method: savedRequest.method,
								body: savedRequest?.body,
								headers: savedRequest?.headers,
								parameters: savedRequest?.parameters,
								url: savedRequest.url,
								unsavedChanges: false,
							}
						: t
				),
				activeTabId: savedRequest.id,
			}))
		}
))
