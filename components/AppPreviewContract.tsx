import { Button, Link } from "@nextui-org/react";
import { useAppContext } from "../utils/useAppContext";
import CopyToClipboardButton from "./CopyToClipboardButton";
import BuyMeACoffee from "./BuyMeACoffee";

export default function AppPreviewContract() {
  const { contract, hasContract, showNotification, downloadContract } =
    useAppContext();

  if (!contract || !hasContract) return null;

  const previewHeaderMarkup = (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <Link
        href={`${contract.network?.url}/address/${contract.address}`}
        isExternal
        showAnchorIcon
      >
        <span className="text-lg font-semibold">Contract: {contract.name}</span>
      </Link>
      <div className="flex items-center gap-4">
        <BuyMeACoffee />
        <Button onClick={downloadContract}>
          <span className="font-semibold">Download contract</span>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      {previewHeaderMarkup}
      <div className="mb-20 flex flex-col gap-4">
        {contract.contents.map((contractData, index) => {
          return (
            <div key={contractData.path}>
              <div className="flex items-center gap-4 pb-2">
                <p className="break-words font-semibold">
                  {index + 1} of {contract.contents.length}: {contractData.path}
                </p>
                <CopyToClipboardButton data={contractData.content} />
              </div>
              <div className="group relative w-full rounded-md border-2 p-2">
                <div className="h-48 w-full overflow-auto">
                  <pre>
                    <code>{contractData.content}</code>
                  </pre>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
