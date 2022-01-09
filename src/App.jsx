import { useState } from "react";
import { AppForm } from "./components/AppForm";
import { AppButton } from "./components/AppButton";
import { DownloadIcon } from "./components/icons/DownloadIcon";
import { DuplicateIcon } from "./components/icons/DuplicateIcon";
import {
  exportContractContentsToZip,
  getContractContentList,
  getContractSourceCode,
} from "./lib/helpers";

function App() {
  const [contract, setContract] = useState({
    address: "",
    contents: [],
  });
  const fetchContract = async (apiKey, contractAddress) => {
    const result = await getContractSourceCode(apiKey, contractAddress);
    const sourceCodes = result.data.result;
    const contractContents = getContractContentList(sourceCodes);
    setContract({
      address: contractAddress,
      contents: contractContents,
    });
  };

  const downloadContract = () => {
    exportContractContentsToZip(contract.contents, contract.address);
  };

  const copyToClipboard = (data) => {
    navigator.clipboard.writeText(data).then(function () {
      alert("Copied!");
    });
  };

  return (
    <div className="md:px-10 px-4 pt-8 pb-4 w-full">
      <h1 className="text-2xl font-semibold tracking-widest text-center pb-4">
        Contract Downloader
      </h1>
      <div className="flex justify-center w-full">
        <div className="border-2 md:px-8 px-2 py-4 rounded-sm lg:w-2/5 md:w-3/5 w-full">
          <AppForm submitForm={fetchContract} />
        </div>
      </div>
      {contract.address.length > 0 && (
        <>
          <hr className="my-6" />
          <div className="flex justify-end">
            <AppButton onClick={downloadContract}>
              <div className="flex gap-2">
                <DownloadIcon />
                <span>Download Contract</span>
              </div>
            </AppButton>
          </div>
          <div className="py-2"></div>
          <div className="flex flex-col gap-3">
            {contract.contents.map((contractData, index) => {
              return (
                <div key={contractData.path}>
                  <div className="flex flex-wrap gap-2 pb-2">
                    <span className="font-semibold">
                      {index + 1}: {contractData.path}
                    </span>
                    <button
                      onClick={() => copyToClipboard(contractData.content)}
                    >
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
        </>
      )}
    </div>
  );
}

export default App;
