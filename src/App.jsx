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
import GitHubButton from "react-github-btn";

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
      const sourceCodes = result.data.result;
      if (sourceCodes === "Invalid API Key") {
        errorChildRef.current.showNotification("Invalid API Key");
        return;
      }
      if (sourceCodes[0].SourceCode === "") {
        errorChildRef.current.showNotification("Invalid Address");
        return;
      }
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
      <div className="flex justify-center gap-4 pb-2">
        <GitHubButton
          href="https://github.com/amimaro/smart-contract-downloader"
          data-show-count="true"
          aria-label="Star amimaro/smart-contract-downloader on GitHub"
        >
          Star
        </GitHubButton>
        <GitHubButton
          href="https://github.com/amimaro/smart-contract-downloader/fork"
          aria-label="Fork amimaro/smart-contract-downloader on GitHub"
        >
          Fork
        </GitHubButton>
        <GitHubButton
          href="https://github.com/amimaro"
          aria-label="Follow @amimaro on GitHub"
        >
          Follow @amimaro
        </GitHubButton>
      </div>
      <div className="flex justify-center w-full">
        <div className="md:px-8 px-2 py-4 rounded-sm lg:w-2/5 md:w-3/5 w-full">
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
