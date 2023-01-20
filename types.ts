export interface ContractObject {
  name: string;
  address: string;
  contents: any[];
}

export interface NetworksObject {
  [key: string]: NetworkItem;
}

export interface NetworkItem {
  id?: string;
  label: string;
  url: string;
  apiKey: string;
  endpoint: (contractAddress: string) => string;
}
