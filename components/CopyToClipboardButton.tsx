import { ClipboardIcon, CheckIcon } from "@heroicons/react/20/solid";
import { copyToClipboard } from "../utils/helpers";
import { useAppContext } from "../utils/useAppContext";
import { useEffect, useState } from "react";
import { Tooltip } from "@nextui-org/react";

export default function CopyToClipboardButton({ data }: { data: string }) {
  const { showNotification } = useAppContext();
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (!clicked) return;
    setTimeout(() => {
      setClicked(false);
    }, 1000);
  }, [clicked]);

  if (clicked) {
    return <CheckIcon width={20} color="#050" />;
  }

  return (
    <Tooltip content="Copy content to clipboard">
      <button
        onClick={() => {
          setClicked(true);
          showNotification({
            message: "Copied to clipboard",
          });
          copyToClipboard(data);
        }}
      >
        <ClipboardIcon width={20} color="#555" />
      </button>
    </Tooltip>
  );
}
