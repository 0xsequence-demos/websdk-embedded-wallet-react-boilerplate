import { useAccount } from "wagmi";

import TestSignMessage from "../components/TestSignMessage";
import TestVerifyMessage from "../components/TestVerifyMessage";
import TestSendTransaction from "../components/TestSendTransaction";

import { Group, Card } from "boilerplate-design-system";

export function Connected() {
  const { address, chain, chainId } = useAccount();

  if (!address || !chain || !chainId) {
    return (
      <div className="flex flex-col gap-8">
        <Group title="User info">
          <Card
            style={{ gap: "1rem", display: "flex", flexDirection: "column" }}
          >
            Missing information (
            {[
              !address ? "address" : null,
              !chain ? "chain" : null,
              !chainId ? "chainId" : null,
            ]
              .filter((n) => !!n)
              .join(", ")}
            ) required to display user info
          </Card>
        </Group>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <Group>
        <Card
          collapsable
          title="Sign message"
          data-id="sign-message"
          className="bg-white/10 border border-white/10 backdrop-blur-sm"
        >
          <TestSignMessage />
        </Card>

        <Card
          collapsable
          title="Verify message"
          data-id="verify-message"
          className="bg-white/10 border border-white/10 backdrop-blur-sm"
        >
          <TestVerifyMessage chainId={chainId} />
        </Card>

        <Card
          collapsable
          title="Send transaction"
          data-id="send-transaction"
          className="bg-white/10 border border-white/10 backdrop-blur-sm"
        >
          <TestSendTransaction chainId={chainId} />
        </Card>
      </Group>
    </div>
  );
}
