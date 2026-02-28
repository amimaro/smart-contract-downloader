export interface ContractObject {
  name: string;
  address: string;
  contents: any[];
  network: NetworkItem | null;
}

export interface NetworksObject {
  [key: number]: NetworkItem;
}

export interface NetworkItem {
  label: string;
  url: string;
  section?: string;
}
