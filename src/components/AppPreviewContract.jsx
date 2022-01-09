import { DuplicateIcon } from "./icons/DuplicateIcon";
import { copyToClipboard } from "../lib/helpers";

export const AppPreviewContract = ({ contract }) => {
  return (
    <div className="flex flex-col gap-3">
      {contract.contents.map((contractData, index) => {
        return (
          <div key={contractData.path}>
            <div className="flex flex-wrap gap-2 pb-2">
              <span className="font-semibold">
                {index + 1}: {contractData.path}
              </span>
              <button onClick={() => copyToClipboard(contractData.content)}>
                <DuplicateIcon />
              </button>
            </div>
            <textarea
              className="border-2 w-full h-40 p-2 focus:ring-4 rounded-md"
              value={contractData.content}
              readOnly
            />
          </div>
        );
      })}
    </div>
  );
};
