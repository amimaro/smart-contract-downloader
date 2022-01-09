import { useState } from "react";
import { AppInput } from "./components/AppInput";
import { AppButton } from "./components/AppButton";
import {
  exportContractContentsToZip,
  getContractContentList,
  getContractSourceCode,
} from "./lib/helpers";

function App() {
  const [apiKey, setApiKey] = useState(
    process.env.REACT_APP_ETHERSCAN_APIKEY || ""
  );
  const [contractAddress, setContractAddress] = useState(
    process.env.REACT_APP_CONTRACT_ADDRESS || ""
  );

  const downloadContract = () => {
    (async () => {
      if (apiKey.length !== 34 || contractAddress.length !== 42) {
        return;
      }
      const result = await getContractSourceCode(apiKey, contractAddress);
      const sourceCodes = result.data.result;
      const contractContents = getContractContentList(sourceCodes);
      exportContractContentsToZip(contractContents, contractAddress);
    })();
  };

  return (
    <div>
      <AppInput
        label="Etherscan API Key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
      />
      <AppInput
        label="Contract Address"
        value={contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
      />
      <AppButton onClick={downloadContract}>
        <div className="flex gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>{" "}
          <span>Download Contract</span>
        </div>
      </AppButton>
    </div>
  );
}

export default App;
