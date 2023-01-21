import axios from "axios";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { createContext, useContext, useRef, useState } from "react";
import { Notification } from "../components/Notification";
import { NETWORKS } from "../networks";
import { ContractObject } from "../types";
import { getContractContentList } from "./helpers";

type NotificationMessageType = {
  message?: string;
  type?: string;
};

type AppContextType = {
  contract: ContractObject | null;
  hasContract: boolean;
  downloadContract: () => void;
  fetchContract: (network: string, contractAddress: string) => void;
  showNotification: ({ message, type }: NotificationMessageType) => void;
};
const AppContext = createContext<AppContextType | undefined>(undefined);

export default function AppContextProvider({ children }: any) {
  const [contract, setContract] = useState<ContractObject>({
    name: "",
    address: "",
    contents: [],
    network: NETWORKS[process.env.NEXT_PUBLIC_DEFAULT_NETWORK || "ethmain"],
  });

  const notificationChildRef: any = useRef();

  const downloadContract = () => {
    var zip = new JSZip();
    for (const contractContent of contract.contents) {
      zip.file(contractContent.path, contractContent.content);
    }
    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, `contract_${contract.address}.zip`);
    });
  };

  const fetchContract = async (network: string, contractAddress: string) => {
    try {
      const result = await axios.get(
        `./api/contract/${network}/${contractAddress}`
      );
      const sourceCodes = result.data.result;
      if (sourceCodes === "Invalid API Key") {
        notificationChildRef.current.showNotification({
          message: "Invalid API Key",
          type: "error",
        });
        return;
      }
      if (sourceCodes[0].SourceCode === "") {
        notificationChildRef.current.showNotification({
          message: "Invalid API Key",
          type: "error",
        });
        return;
      }
      const contractContents = getContractContentList(sourceCodes, network);
      setContract({
        name: sourceCodes[0].ContractName,
        address: contractAddress,
        contents: contractContents,
        network: NETWORKS[network],
      });
    } catch (e) {
      console.error(e);
      notificationChildRef.current.showNotification({
        type: "error",
      });
    }
  };

  return (
    <AppContext.Provider
      value={{
        contract,
        hasContract: !!contract && contract.address.length > 0,
        downloadContract,
        fetchContract,
        showNotification: (notification: NotificationMessageType) =>
          notificationChildRef.current.showNotification(notification),
      }}
    >
      <Notification ref={notificationChildRef} />
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error(`useAppContext must be used within a AppContextProvider.`);
  }
  return context;
};
