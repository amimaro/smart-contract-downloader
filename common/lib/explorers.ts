import axios from "axios";
import { NETWORKS } from "../../networks";

export const getContractSourceCode = async (
  network: string,
  contractAddress: string
) => {
  return await axios.get(NETWORKS[network].endpoint(contractAddress));
};
