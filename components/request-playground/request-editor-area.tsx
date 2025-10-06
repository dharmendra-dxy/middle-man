import { RequestTab } from "@/types/request";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import KeyValueFormEditor from "./key-value-form";

interface Props {
    tab: RequestTab | undefined;
    updateTab: (id: string, data:Partial<RequestTab>) => void;
}

const RequestEditorArea = ({tab, updateTab}: Props) => {
  return (
    <Tabs 
    defaultValue="parameters" 
    className="bg-zinc-900 rounded-md w-full"
    >
      <TabsList className="bg-zinc-800 rounded-t-md">
        <TabsTrigger value="parameters" className="flex-1">
          Parameters
        </TabsTrigger>
        <TabsTrigger value="headers" className="flex-1">
          Headers
        </TabsTrigger>
        <TabsTrigger value="body" className="flex-1">
          Body
        </TabsTrigger>
      </TabsList>

      <TabsContent value="parameters">
        <KeyValueFormEditor
          initialData={[{key: "aa", value: "bb", enabled: true}]}
          onSubmit={()=>{}}
          placeholder={{
            key: "Parameter name",
            value: "Parameter value",
            description: "URL parameter",
          }}
        />
      </TabsContent>
      <TabsContent value="headers">
        headers
      </TabsContent>
      <TabsContent value="body">
        body
      </TabsContent>

    </Tabs>
  )
}
export default RequestEditorArea;
