import {
  mainnet,
  polygon,
  Chain,
  polygonAmoy,
  arbitrumSepolia,
  immutableZkEvmTestnet,
} from "wagmi/chains";

const chains = [
  mainnet,
  polygon,
  polygonAmoy,
  arbitrumSepolia,
  immutableZkEvmTestnet,
] as [Chain, ...Chain[]];

export default chains;
