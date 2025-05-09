import { SequenceConnect } from "@0xsequence/connect";
import { config } from "./config";

import { useAccount, useDisconnect, useSwitchChain } from "wagmi";
import { NotConnected } from "./views/NotConnected";
import { Connected } from "./views/Connected";
import { SequenceBoilerplate } from "@0xsequence-demos/boilerplate-design-system";
import {
  SequenceWalletProvider,
  useOpenWalletModal,
} from "@0xsequence/wallet-widget";

export default function Layout() {
  return (
    <SequenceConnect config={config}>
      <SequenceWalletProvider>
        <App />
      </SequenceWalletProvider>
    </SequenceConnect>
  );
}

function App() {
  const { isConnected } = useAccount();
  const { setOpenWalletModal } = useOpenWalletModal();

  return (
    <SequenceBoilerplate
      githubUrl="https://github.com/0xsequence-demos/kit-embedded-wallet-react-boilerplate"
      name="Sequence Web SDK Starter - React"
      description="Embedded Wallet"
      wagmi={{ useAccount, useDisconnect, useSwitchChain }}
      walletCallback={() => setOpenWalletModal(true)}
    >
      {isConnected ? <Connected /> : <NotConnected />}
    </SequenceBoilerplate>
  );
}
