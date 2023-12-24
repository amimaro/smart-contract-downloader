import { Accordion, AccordionItem, Button, Link } from "@nextui-org/react";
import { useAppContext } from "../utils/useAppContext";
import BuyMeACoffee from "./BuyMeACoffee";
import CopyToClipboardButton from "./CopyToClipboardButton";

export default function AppPreviewContract() {
  const { contract, hasContract, downloadContract } = useAppContext();

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
        <div className="hidden sm:block">
          <BuyMeACoffee />
        </div>
        <Button onClick={downloadContract}>
          <span className="font-semibold">Download contract</span>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      {previewHeaderMarkup}
      <Accordion defaultExpandedKeys={["accordion-0"]}>
        {contract.contents.map((contractData, index) => {
          return (
            <AccordionItem
              key={`accordion-${index}`}
              aria-label={`Accordion ${index + 1}`}
              title={
                <p className="break-words font-semibold">
                  {index + 1} of {contract.contents.length}: {contractData.path}
                </p>
              }
            >
              <div className="group relative w-full rounded-md border-2 p-2">
                <div className="absolute right-10 top-3">
                  <CopyToClipboardButton data={contractData.content} />
                </div>
                <div className="h-56 w-full overflow-auto">
                  <pre>
                    <code>{contractData.content}</code>
                  </pre>
                </div>
              </div>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
