import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip";
  
  export interface HintTooltipProps {
    label: string;
    children: React.ReactNode;
    side?: "top" | "bottom" | "left" | "right";
    align?: "start" | "center" | "end";
    sideOffset?: number;
    alignOffset?: number;
  }
  
  export const HintTooltip = ({
    label,
    children,
    side,
    align,
    sideOffset,
    alignOffset,
  }: HintTooltipProps) => {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
  
          <TooltipContent
            side={side}
            align={align}
            sideOffset={sideOffset}
            alignOffset={alignOffset}
          >
            <p className="font-semibold capitalize">{label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };
  