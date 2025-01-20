import { useAccount, useDisconnect } from "wagmi";
import TestSignMessage from "../components/TestSignMessage";
import TestVerifyMessage from "../components/TestVerifyMessage";
import TestSendTransaction from "../components/TestSendTransaction";
import { NetworkSwitchInputSelect } from "../components/NetworkSwitchInputSelect";

import {
  Field,
  Group,
  Card,
  SegmentedInput,
  Input,
  Label,
  Divider,
  ShowAddressWithDisconnect,
} from "boilerplate-design-system";
import { useNativeBalance } from "../components/NativeBalance";

const MainConnected = () => {
  const { address, chain, chainId } = useAccount();
  const { disconnect } = useDisconnect();

  const balance = useNativeBalance({ chain, address });

  if (!address || !chain || !chainId) {
    return (
      <div className="flex flex-col gap-8">
        <Group title="User info">
          <Card
            style={{ gap: "1rem", display: "flex", flexDirection: "column" }}
          >
            Missing information required to display user info
          </Card>
        </Group>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <Group title="User info">
        <Card style={{ gap: "1rem", display: "flex", flexDirection: "column" }}>
          <ShowAddressWithDisconnect
            address={address}
            onDisconnect={() => disconnect()}
          />

          <NetworkSwitchInputSelect chainId={chain?.id?.toString()} />

          <Field name="test-payments">
            <Label>{chain.name} balance for test payments:</Label>
            <SegmentedInput subvariants={{ width: "full" }}>
              <Input
                type="text"
                variant="transparent"
                value={balance}
                onChange={() => {}}
                subvariants={{ width: "full" }}
                readOnly
              />
            </SegmentedInput>
          </Field>
        </Card>
      </Group>
      <Divider />
      <Group>
        <Card collapsable title="Sign message" data-id="sign-message">
          <TestSignMessage />
        </Card>

        <Card collapsable title="Verify message" data-id="verify-message">
          <TestVerifyMessage chainId={chainId} />
        </Card>

        <Card collapsable title="Send transaction" data-id="send-transaction">
          <TestSendTransaction chainId={chainId} />
        </Card>
      </Group>
    </div>
  );
};

export default MainConnected;
