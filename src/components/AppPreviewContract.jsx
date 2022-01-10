import { DuplicateIcon } from "./icons/DuplicateIcon";
import { copyToClipboard } from "../lib/helpers";

export const AppPreviewContract = ({ contract, showNotification }) => {
  return (
    <div className="flex flex-col gap-3">
      {contract.contents.map((contractData, index) => {
        return (
          <div key={contractData.path}>
            <div className="flex flex-wrap gap-2 pb-2">
              <span className="font-semibold">
                {index + 1} of {contract.contents.length}: {contractData.path}
              </span>
              <button
                className="text-blue-700"
                onClick={() => {
                  showNotification();
                  copyToClipboard(contractData.content);
                }}
              >
                <DuplicateIcon />
              </button>
            </div>
            <textarea
              className="border-2 w-full h-40 p-2 focus:ring-4 rounded-md bg-gray-100"
              value={contractData.content}
              readOnly
            />
          </div>
        );
      })}
    </div>
  );
};
