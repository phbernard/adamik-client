import { Window as KeplrWindow } from "@keplr-wallet/types";

declare global {
  interface Window extends KeplrWindow {
    leap: any; // LeapWallet Maybe later typing it but not necessary 
  }
}