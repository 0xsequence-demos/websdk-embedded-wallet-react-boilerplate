import { createConfig } from "@0xsequence/connect";
import { chainIdFromString, chainIdsFromString } from "./utils/chainIdUtils";

const projectAccessKey = import.meta.env.VITE_PROJECT_ACCESS_KEY;
const waasConfigKey = import.meta.env.VITE_WAAS_CONFIG_KEY;
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const appleClientId = import.meta.env.VITE_APPLE_CLIENT_ID;
const appleRedirectURI = window.location.origin + window.location.pathname;
const walletConnectId = import.meta.env.VITE_WALLET_CONNECT_ID;
const chainIds = chainIdsFromString(import.meta.env.VITE_CHAINS);
const defaultChainId = chainIdFromString(import.meta.env.VITE_DEFAULT_CHAIN);

if (defaultChainId && !chainIds.includes(defaultChainId)) {
  console.warn(
    `Your preferred default chain ${defaultChainId} is not on your list of supported chains (${import.meta.env.VITE_DEFAULT_CHAIN})`,
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const config: any = createConfig("waas", {
  projectAccessKey: projectAccessKey,
  chainIds,
  defaultChainId,
  appName: "Kit Starter",
  waasConfigKey: waasConfigKey,
  googleClientId: googleClientId,
  appleClientId: appleClientId,
  appleRedirectURI: appleRedirectURI,
  walletConnectProjectId: walletConnectId,
});
