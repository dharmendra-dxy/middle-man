import { Loader2 } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center">
        <Loader2 size={40} className="animate-spin text-indigo-400"/>
    </div>
  )
};

export default Loading;
