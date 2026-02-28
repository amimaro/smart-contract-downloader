import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { copyToClipboard } from "../utils/helpers";

export default function CopyToClipboardButton({ data }: { data: string }) {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (!clicked) return;
    const t = setTimeout(() => setClicked(false), 1000);
    return () => clearTimeout(t);
  }, [clicked]);

  if (clicked) {
    return (
      <span className="inline-flex text-green-600" aria-hidden>
        <Check className="h-5 w-5" />
      </span>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={() => {
              setClicked(true);
              copyToClipboard(data);
            }}
            className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            aria-label="Copy content to clipboard"
          >
            <Copy className="h-5 w-5" />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Copy content to clipboard</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
