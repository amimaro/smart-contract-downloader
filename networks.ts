import { NetworksObject } from "./types";

export const NETWORKS: NetworksObject = {
  ethmain: {
    label: "Ethereum Mainnet",
    url: "https://etherscan.io",
    apiKey: process.env.APIKEY_ETHERSCAN as string,
    endpoint: (contractAddress: string) =>
      `https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${process.env.APIKEY_ETHERSCAN}`,
    section: "Ethereum",
  },
  sepolia: {
    label: "Sepolia Testnet",
    url: "https://sepolia.etherscan.io",
    apiKey: process.env.APIKEY_ETHERSCAN as string,
    endpoint: (contractAddress: string) =>
      `https://api-sepolia.etherscan.io/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${process.env.APIKEY_ETHERSCAN}`,
    section: "Ethereum",
  },
  holesky: {
    label: "Holesky Testnet",
    url: "https://holesky.etherscan.io",
    apiKey: process.env.APIKEY_ETHERSCAN as string,
    endpoint: (contractAddress: string) =>
      `https://api-holesky.etherscan.io/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${process.env.APIKEY_ETHERSCAN}`,
    section: "Ethereum",
  },
  rinkeby: {
    label: "Rinkeby Testnet",
    url: "https://rinkeby.etherscan.io",
    apiKey: process.env.APIKEY_ETHERSCAN as string,
    endpoint: (contractAddress: string) =>
      `https://api-rinkeby.etherscan.io/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${process.env.APIKEY_ETHERSCAN}`,
    section: "Ethereum",
  },
  ropsten: {
    label: "Ropsten Testnet",
    url: "https://ropsten.etherscan.io",
    apiKey: process.env.APIKEY_ETHERSCAN as string,
    endpoint: (contractAddress: string) =>
      `https://api-ropsten.etherscan.io/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${process.env.APIKEY_ETHERSCAN}`,
    section: "Ethereum",
  },
  kovan: {
    label: "Kovan Testnet",
    url: "https://kovan.etherscan.io",
    apiKey: process.env.APIKEY_ETHERSCAN as string,
    endpoint: (contractAddress: string) =>
      `https://api-kovan.etherscan.io/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${process.env.APIKEY_ETHERSCAN}`,
    section: "Ethereum",
  },
  goerli: {
    label: "Goerli Testnet",
    url: "https://goerli.etherscan.io",
    apiKey: process.env.APIKEY_ETHERSCAN as string,
    endpoint: (contractAddress: string) =>
      `https://api-goerli.etherscan.io/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${process.env.APIKEY_ETHERSCAN}`,
    section: "Ethereum",
  },
  polygon: {
    label: "Polygon Mainnet",
    url: "https://polygonscan.com",
    apiKey: process.env.APIKEY_POLYGONSCAN as string,
    endpoint: (contractAddress: string) =>
      `https://api.polygonscan.com/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${process.env.APIKEY_POLYGONSCAN}`,
    section: "Polygon",
  },
  polygonTest: {
    label: "Polygon Mumbai Testnet",
    url: "https://mumbai.polygonscan.com",
    apiKey: process.env.APIKEY_POLYGONSCAN as string,
    endpoint: (contractAddress: string) =>
      `https://api-testnet.polygonscan.com/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${process.env.APIKEY_POLYGONSCAN}`,
    section: "Polygon",
  },
  optimistic: {
    label: "Optimistic Mainnet",
    url: "https://optimistic.etherscan.io",
    apiKey: process.env.APIKEY_OPTIMISTIC as string,
    endpoint: (contractAddress: string) =>
      `https://api-optimistic.etherscan.io/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${process.env.APIKEY_OPTIMISTIC}`,
    section: "Optimistic",
  },
  "optimistic goerli": {
    label: "Optimistic Goerli Testnet",
    url: "https://goerli-optimism.etherscan.io",
    apiKey: process.env.APIKEY_OPTIMISTIC as string,
    endpoint: (contractAddress: string) =>
      `https://api-goerli-optimism.etherscan.io/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${process.env.APIKEY_OPTIMISTIC}`,
    section: "Optimistic",
  },
  "optimistic sepolia": {
    label: "Optimistic Sepolia Testnet",
    url: "https://sepolia-optimism.etherscan.io",
    apiKey: process.env.APIKEY_OPTIMISTIC as string,
    endpoint: (contractAddress: string) =>
      `https://api-sepolia-optimism.etherscan.io/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${process.env.APIKEY_OPTIMISTIC}`,
    section: "Optimistic",
  },
  "arbitrum one": {
    label: "Arbitrum One Mainnet",
    url: "https://arbiscan.io",
    apiKey: process.env.APIKEY_BSCSCAN as string,
    endpoint: (contractAddress: string) =>
      `https://api.arbiscan.io/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${process.env.APIKEY_BSCSCAN}`,
    section: "Arbitrum",
  },
  "arbitrum nova": {
    label: "Arbitrum Nova Mainnet",
    url: "https://nova.arbiscan.io",
    apiKey: process.env.APIKEY_ARBITRUMSCAN as string,
    endpoint: (contractAddress: string) =>
      `https://api-nova.arbiscan.io/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${process.env.APIKEY_ARBITRUMSCAN}`,
    section: "Arbitrum",
  },
  "arbitrum goerli": {
    label: "Arbitrum Goerli Testnet",
    url: "https://goerli.arbiscan.io",
    apiKey: process.env.APIKEY_ARBITRUMSCAN as string,
    endpoint: (contractAddress: string) =>
      `https://api-goerli.arbiscan.io/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${process.env.APIKEY_ARBITRUMSCAN}`,
    section: "Arbitrum",
  },
  bsc: {
    label: "Binance Smart Chain Mainnet",
    url: "https://bscscan.com",
    apiKey: process.env.APIKEY_BSCSCAN as string,
    endpoint: (contractAddress: string) =>
      `https://api.bscscan.com/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${process.env.APIKEY_BSCSCAN}`,
    section: "Binance Smart Chain",
  },
  bscTest: {
    label: "Binance Smart Chain Testnet",
    url: "https://testnet.bscscan.com",
    apiKey: process.env.APIKEY_BSCSCAN as string,
    endpoint: (contractAddress: string) =>
      `https://api-testnet.bscscan.com/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${process.env.APIKEY_BSCSCAN}`,
    section: "Binance Smart Chain",
  },
  fantom: {
    label: "Fantom Mainnet",
    url: "https://ftmscan.com",
    apiKey: process.env.APIKEY_FTMSCAN as string,
    endpoint: (contractAddress: string) =>
      `https://api.ftmscan.com/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${process.env.APIKEY_FTMSCAN}`,
    section: "Fantom",
  },
  fantomTest: {
    label: "Fantom Testnet",
    url: "https://testnet.ftmscan.com",
    apiKey: process.env.APIKEY_FTMSCAN as string,
    endpoint: (contractAddress: string) =>
      `https://api-testnet.ftmscan.com/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${process.env.APIKEY_FTMSCAN}`,
    section: "Fantom",
  },
};
