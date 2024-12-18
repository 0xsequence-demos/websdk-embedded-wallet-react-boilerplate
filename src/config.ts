import { createConfig } from "@0xsequence/kit";

// Get your own keys on sequence.build
const projectAccessKey = import.meta.env.VITE_PROJECT_ACCESS_KEY;
const waasConfigKey = import.meta.env.VITE_WAAS_CONFIG_KEY;
const chainId = Number(import.meta.env.VITE_CHAIN_ID);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const config: any = createConfig("waas", {
  projectAccessKey: projectAccessKey,
  chainIds: [chainId],
  defaultChainId: chainId,
  appName: "Kit Starter",
  waasConfigKey: waasConfigKey,
  google: false,
  apple: false,
  walletConnect: false,
  coinbase: false,
});
