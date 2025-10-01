import { Unplug } from "lucide-react";
import React from "react";

const Logo = ({size}: {size?: number}) => {
  return <Unplug size={32} className=" text-indigo-400 rounded-full"/>;
};

export default Logo;
