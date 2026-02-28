import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useAppContext } from "../utils/useAppContext";
import BuyMeACoffee from "./BuyMeACoffee";
import CopyToClipboardButton from "./CopyToClipboardButton";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import DonationAddresses from "./DonationAddresses";

export default function AppPreviewContract() {
  const { contract, hasContract, downloadContract } = useAppContext();

  if (!contract || !hasContract) return null;

  const explorerUrl = `${contract.network?.url}/address/${contract.address}`;

  const previewHeaderMarkup = (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <Link
        href={explorerUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-lg font-semibold text-primary underline-offset-4 hover:underline"
      >
        <span>Contract: {contract.name}</span>
        <ExternalLink className="h-4 w-4 shrink-0" />
      </Link>
      <div className="flex items-center gap-4">
        <Button onClick={downloadContract}>
          <span className="font-semibold">Download contract</span>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      {previewHeaderMarkup}
      <Accordion type="single" defaultValue="accordion-0" collapsible>
        {contract.contents.map((contractData, index) => (
          <AccordionItem key={`accordion-${index}`} value={`accordion-${index}`}>
            <AccordionTrigger>
              <p className="break-words text-left font-semibold">
                {index + 1} of {contract.contents.length}: {contractData.path}
              </p>
            </AccordionTrigger>
            <AccordionContent>
              <div className="group relative w-full rounded-md border-2 border-border bg-muted/30 p-2">
                <div className="absolute right-10 top-3">
                  <CopyToClipboardButton data={contractData.content} />
                </div>
                <div className="h-56 w-full overflow-auto">
                  <pre className="text-sm">
                    <code>{contractData.content}</code>
                  </pre>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="flex justify-center">
        <DonationAddresses />
      </div>
    </div>
  );
}
