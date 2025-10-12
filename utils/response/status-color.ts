export const getStatusColor = (status?:number): string => {
  const s = typeof status == "number" ? status : 0;

  if(s>= 200 && s<300) return "text-green-400";
  if(s>= 300 && s<400) return "text-yello-400";
  if(s>= 400 && 5<500) return "text-orange-400";
  if(s>= 500) return "text-red-400";

  return "text-gray-400";
}