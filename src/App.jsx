import axios from "axios";
import { useState, useEffect } from "react";
import { AppInput } from "./components/AppInput";

function parseSourceCodeObject(sourceCode) {
  return JSON.parse(sourceCode.substr(1, sourceCode.length - 2));
}

function App() {
  const [apiKey, setApiKey] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  useEffect(() => {
    (async () => {
      const result = await axios.get(
        `https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${apiKey}`
      );
      const sourceCodes = result.data.result;
      for (const sourceCode of sourceCodes) {
        const parsedSourceCode = parseSourceCodeObject(sourceCode.SourceCode);
        console.log(parsedSourceCode);
        for (const [fileName, contentObj] of Object.entries(
          parsedSourceCode.sources
        )) {
          console.log(fileName, contentObj);
        }
      }
    })();
  }, [apiKey]);
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
