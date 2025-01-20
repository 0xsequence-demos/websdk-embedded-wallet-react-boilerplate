import { useAccount } from "wagmi";

import Connector from "./Connector";
import MainConnected from "./MainConnected";
import { SequenceBoilerplate } from "boilerplate-design-system";

const Home = () => {
  const { isConnected } = useAccount();

  return (
    <SequenceBoilerplate
      githubUrl="https://github.com/0xsequence-demos/kit-embedded-wallet-react-boilerplate"
      name="Sequence Kit Starter - React"
      description="Embedded Wallet"
    >
      {isConnected ? <MainConnected /> : <Connector />}
    </SequenceBoilerplate>
  );
};

export default Home;
