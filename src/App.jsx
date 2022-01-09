import { useState, useEffect } from "react";
import { AppInput } from "./components/AppInput";
import {
  exportContractContentToZip,
  getContractSourceCode,
} from "./lib/helpers";

function App() {
  const [apiKey, setApiKey] = useState(
    process.env.REACT_APP_ETHERSCAN_APIKEY || ""
  );
  const [contractAddress, setContractAddress] = useState(
    process.env.REACT_APP_CONTRACT_ADDRESS || ""
  );
  useEffect(() => {
    (async () => {
      if (apiKey.length !== 34 || contractAddress.length !== 42) {
        return;
      }
      const result = await getContractSourceCode(apiKey, contractAddress);
      const sourceCodes = result.data.result;
      exportContractContentToZip(sourceCodes, contractAddress);
    })();
  }, [apiKey, contractAddress]);
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
    </div>
  );
}

export default App;
