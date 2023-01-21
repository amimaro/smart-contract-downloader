import { ArrowDownTrayIcon, ClipboardIcon } from "@heroicons/react/20/solid";
import { copyToClipboard } from "../utils/helpers";
import { useAppContext } from "../utils/useAppContext";
import { AppButton } from "./AppButton";
import ExternalLink from "./ExternalLink";

export default function AppPreviewContract() {
  const { contract, hasContract, showNotification, downloadContract } =
    useAppContext();

  if (!contract || !hasContract) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-start md:flex-row">
        <div className="flex-grow">
          {!!contract.name && (
            <ExternalLink
              href={`${contract.network?.url}/address/${contract.address}`}
            >
              <h2>Contract: {contract.name}</h2>
            </ExternalLink>
          )}
        </div>
        <div>
          <AppButton
            onClick={downloadContract}
            icon={<ArrowDownTrayIcon width={20} />}
          >
            <span className="hidden md:block">Download contract</span>
          </AppButton>
        </div>
      </div>
      <div className="mb-20 flex flex-col gap-4">
        {contract.contents.map((contractData, index) => {
          return (
            <div key={contractData.path}>
              <p className="break-words pb-2 font-semibold">
                {index + 1} of {contract.contents.length}: {contractData.path}
              </p>

              <div className="group relative w-full rounded-md border-2 p-2">
                <div className="h-48 w-full overflow-auto">
                  <div className="absolute right-5 top-3 md:right-8">
                    <button
                      className="block rounded-md bg-app-700 p-4 opacity-60 hover:opacity-80 group-hover:block md:hidden"
                      onClick={() => {
                        showNotification({
                          message: "Copied to clipboard",
                        });
                        copyToClipboard(contractData.content);
                      }}
                    >
                      <ClipboardIcon width={20} />
                    </button>
                  </div>
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
