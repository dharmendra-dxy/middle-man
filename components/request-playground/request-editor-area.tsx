import { RequestTab } from "@/types/request";
import React from "react";

interface Props {
    tab: RequestTab | undefined;
    updateTab: (id: string, data:Partial<RequestTab>) => void;
}

const RequestEditorArea = ({tab, updateTab}: Props) => {
  return <div>RequestEditorArea</div>;
};

export default RequestEditorArea;
