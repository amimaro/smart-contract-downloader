import { CheckIcon, ClipboardIcon } from "@heroicons/react/20/solid";
import { Tooltip } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { copyToClipboard } from "../utils/helpers";

export default function CopyToClipboardButton({ data }: { data: string }) {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (!clicked) return;
    setTimeout(() => {
      setClicked(false);
    }, 1000);
  }, [clicked]);

  if (clicked) {
    return <CheckIcon width={20} color="#0a0" />;
  }

  return (
    <Tooltip content="Copy content to clipboard">
      <button
        onClick={() => {
          setClicked(true);
          copyToClipboard(data);
        }}
      >
        <ClipboardIcon width={20} color="#ccc" />
      </button>
    </Tooltip>
  );
}
