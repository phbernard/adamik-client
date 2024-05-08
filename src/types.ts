export type Chain = "cosmoshub" | "algorand" | "osmosis" | EVMChain;

export type EVMChain =
  | "ethereum"
  | "sepolia"
  | "holesky"
  | "zksync"
  | "zksync-sepolia"
  | "injective-testnet"
  | "base"
  | "base-sepolia"
  | "optimism"
  | "optimism-sepolia"
  | "arbitrum"
  | "arbitrum-sepolia";

export type Mode = "transfer" | "delegate";

type TransactionCommon = {
  mode: Mode;
  useMaxAmount: boolean;
  chainId: Chain;
  fees?: string;
  gas?: string;
  amount?: string;
  format?: string;
  pubKey?: string;
  memo?: string;
};

export type TransferTransaction = {
  mode: "transfer";
  chainId: string;
  senders: string[];
  recipients: string[];
};

export type DelegateTransaction = {
  mode: "delegate";
  chainId: string;
  senders: string[];
  validator: string;
};

export type Transaction = TransactionCommon &
  (TransferTransaction | DelegateTransaction);

// TODO refactor this to be more generic without any
export interface IWallet<T = any, R = any, B = any> {
  name: string;
  supportedChains: Chain[];
  icon: string;
  unit: number;
  signFormat: string;
  withoutBroadcast: boolean;
  connect: (chainId: Chain) => Promise<void>;
  getAddress: (chainId: string) => Promise<string>;
  signMessage: (chainId: string, payload: T) => Promise<R>;
  extractSignature: (signature: R) => string;
  getPubkey?: () => Promise<string>;
  getExplorerUrl: (chainId: Chain, hash: string) => string;
  getHashFromBroadcast: (broadcast: B) => string;
}