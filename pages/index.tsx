import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import { useRef, useState } from "react";
import { AppButton } from "../components/AppButton";
import { AppCopiedToClipboardNotification } from "../components/AppCopiedToClipboardNotification";
import { AppErrorNotification } from "../components/AppErrorNotification";
import { AppForm } from "../components/AppForm";
import { AppGithubButtons } from "../components/AppGithubButtons";
import { AppPreviewContract } from "../components/AppPreviewContract";
import { DownloadIcon } from "../components/icons/DownloadIcon";
import { ContractObject } from "../types";
import { exportContractContentsToZip } from "../utils/exporters";
import { getContractContentList } from "../utils/helpers";

const Home: NextPage = () => {
  const [contract, setContract] = useState<ContractObject>({
    name: "",
    address: "",
    contents: [],
  });
  const clipboardChildRef: any = useRef();
  const errorChildRef: any = useRef();

  const fetchContract = async (network: string, contractAddress: string) => {
    try {
      const result = await axios.get(
        `./api/contract/${network}/${contractAddress}`
      );
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
        name: sourceCodes[0].ContractName,
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
    <div>
      <Head>
        <title>Smart Contract Downloader</title>
        <meta name="description" content="Find and Download smart contracts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="md:px-10 px-4 pt-8 pb-4 w-full">
        <AppCopiedToClipboardNotification ref={clipboardChildRef} />
        <AppErrorNotification ref={errorChildRef} />
        <h1 className="text-2xl font-semibold tracking-widest text-center pb-4">
          Smart Contract Downloader
        </h1>
        <AppGithubButtons />
        <div className="py-2"></div>
        <div className="flex justify-center w-full">
          <div className="rounded-sm lg:w-2/5 md:w-3/5 w-full">
            <AppForm submitForm={fetchContract} />
          </div>
        </div>
        {contract.address.length > 0 && (
          <>
            <hr className="my-6" />
            <div className="flex items-center">
              <div className="flex-grow">
                {contract.name.length > 0 && (
                  <h2 className="font-bold">Name: {contract.name}</h2>
                )}
              </div>
              <AppButton className="flex-shrink" onClick={downloadContract}>
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
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
