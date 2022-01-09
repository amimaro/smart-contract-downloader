import { useState, useRef } from "react";
import { AppForm } from "./components/AppForm";
import { AppButton } from "./components/AppButton";
import { AppPreviewContract } from "./components/AppPreviewContract";
import { AppCopiedToClipboardNotification } from "./components/AppCopiedToClipboardNotification";
import { AppErrorNotification } from "./components/AppErrorNotification";
import { DownloadIcon } from "./components/icons/DownloadIcon";
import {
  exportContractContentsToZip,
  getContractContentList,
  getContractSourceCode,
} from "./lib/helpers";

function defaultContractObj() {
  return {
    address: "",
    contents: [],
  };
}

function App() {
  const [contract, setContract] = useState(defaultContractObj());
  const clipboardChildRef: any = useRef();
  const errorChildRef: any = useRef();

  const fetchContract = async (apiKey, network, contractAddress) => {
    setContract(defaultContractObj());
    try {
      const result = await getContractSourceCode(
        apiKey,
        network,
        contractAddress
      );
      console.log("result", result);
      if (result.data.result === "Invalid API Key") {
        errorChildRef.current.showNotification("Invalid API Key");
        return;
      }
      const sourceCodes = result.data.result;
      const contractContents = getContractContentList(sourceCodes, network);
      setContract({
        address: contractAddress,
        contents: contractContents,
      });
    } catch (e) {
      console.error(e);
      errorChildRef.current.showNotification();
    }
  };

  const downloadContract = () => {
    exportContractContentsToZip(contract.contents, contract.address);
  };

  return (
    <div className="md:px-10 px-4 pt-8 pb-4 w-full">
      <AppCopiedToClipboardNotification ref={clipboardChildRef} />
      <AppErrorNotification ref={errorChildRef} />
      <h1 className="text-2xl font-semibold tracking-widest text-center pb-4">
        Smart Contract Downloader
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
          <AppPreviewContract
            contract={contract}
            showNotification={() =>
              clipboardChildRef.current.showNotification()
            }
          />
        </>
      )}
    </div>
  );
}

export default App;
