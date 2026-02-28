import { Toaster } from "@/components/ui/sonner";
import axios from "axios";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { createContext, useContext, useState } from "react";
import { toast } from "sonner";
import { NETWORKS } from "../networks";
import { ContractObject } from "../types";
import { getContractContentList } from "./helpers";


type AppContextType = {
  contract: ContractObject | null;
  hasContract: boolean;
  downloadContract: () => void;
  fetchContract: (chainId: number, contractAddress: string) => void;
};
const AppContext = createContext<AppContextType | undefined>(undefined);

export default function AppContextProvider({ children }: any) {
  const [contract, setContract] = useState<ContractObject>({
    name: "",
    address: "",
    contents: [],
    network: NETWORKS[1] ?? null,
  });

  const downloadContract = () => {
    var zip = new JSZip();
    for (const contractContent of contract.contents) {
      zip.file(contractContent.path, contractContent.content);
    }
    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, `contract_${contract.address}.zip`);
    });
  };

  const fetchContract = async (chainId: number, contractAddress: string) => {
    try {
      const result = await axios.get(
        `./api/contract/${chainId}/${contractAddress}`
      );
      const sourceCodes = result.data.result;
      if (sourceCodes === "Invalid API Key") {
        toast.error("Invalid API Key");
        return;
      }
      if (sourceCodes[0].SourceCode === "") {
        toast.error("Invalid API Key");
        return;
      }
      const contractContents = getContractContentList(sourceCodes, NETWORKS[chainId]?.label ?? "");
      setContract({
        name: sourceCodes[0].ContractName,
        address: contractAddress,
        contents: contractContents,
        network: NETWORKS[chainId] ?? null,
      });
      return true;
    } catch (e) {
      console.error(e);
      toast.error("Invalid API Key");
      return;
    }
  };

  return (
    <AppContext.Provider
      value={{
        contract,
        hasContract: !!contract && contract.address.length > 0,
        downloadContract,
        fetchContract,
      }}
    >
      {children}
      <Toaster />
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
