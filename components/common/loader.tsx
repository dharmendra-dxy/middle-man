import { Loader2 } from "lucide-react";
import React from "react";

const Loader = ({size}: {size?:number}) => {
  return (
    <div className="flex flex-col justify-center items-center">
        <Loader2 size={size ?? 40} className="animate-spin text-indigo-400"/>
    </div>
  )
};

export default Loader;
