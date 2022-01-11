import axios from "axios";

export const NETWORKS = [
  { id: "ethmain", label: "Ethereum Mainnet", site: "https://etherscan.io/" },
  {
    id: "rinkeby",
    label: "Rinkeby Testnet",
    site: "https://rinkeby.etherscan.io/",
  },
  {
    id: "ropsten",
    label: "Ropsten Testnet",
    site: "https://ropsten.etherscan.io/",
  },
  { id: "kovan", label: "Kovan Testnet", site: "https://kovan.etherscan.io/" },
  {
    id: "goerli",
    label: "Goerli Testnet",
    site: "https://goerli.etherscan.io/",
  },
  { id: "polygon", label: "Polygon Mainnet", site: "https://polygonscan.com/" },
  {
    id: "polygonTest",
    label: "Polygon Mumbai Testnet",
    site: "https://mumbai.polygonscan.com/",
  },
  {
    id: "bsc",
    label: "Binance Smart Chain Mainnet",
    site: "https://bscscan.com/",
  },
  {
    id: "bscTest",
    label: "Binance Smart Chain Testnet",
    site: "https://testnet.bscscan.com/",
  },
];

export const getContractSourceCode = async (
  apiKey: string,
  network: string,
  contractAddress: string
) => {
  const networkRequests: any = {
    ethmain: `https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${apiKey}`,
    rinkeby: `https://api-rinkeby.etherscan.io/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${apiKey}`,
    ropsten: `https://api-ropsten.etherscan.io/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${apiKey}`,
    kovan: `https://api-kovan.etherscan.io/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${apiKey}`,
    goerli: `https://api-goerli.etherscan.io/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${apiKey}`,
    polygon: `https://api.polygonscan.com/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${apiKey}`,
    polygonTest: `https://api-testnet.polygonscan.com/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${apiKey}`,
    bsc: `https://api.bscscan.com/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${apiKey}`,
    bscTest: `https://api-testnet.bscscan.com/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${apiKey}`,
  };
  return await axios.get(networkRequests[network]);
};

export const getApiKeyByNetwork = (network: string) => {
  let apiKey;
  switch (network) {
    case "ethmain":
      apiKey = process.env.APP_APIKEY_ETHERSCAN;
      break;
    case "rinkeby":
      apiKey = process.env.APP_APIKEY_ETHERSCAN;
      break;
    case "ropsten":
      apiKey = process.env.APP_APIKEY_ETHERSCAN;
      break;
    case "kovan":
      apiKey = process.env.APP_APIKEY_ETHERSCAN;
      break;
    case "goerli":
      apiKey = process.env.APP_APIKEY_ETHERSCAN;
      break;
    case "polygon":
      apiKey = process.env.APP_APIKEY_POLYGONSCAN;
      break;
    case "polygonTest":
      apiKey = process.env.APP_APIKEY_POLYGONSCAN;
      break;
    case "bsc":
      apiKey = process.env.APP_APIKEY_BSCSCAN;
      break;
    case "bscTest":
      apiKey = process.env.APP_APIKEY_BSCSCAN;
      break;
    default:
      apiKey = null;
      break;
  }
  return apiKey;
};
