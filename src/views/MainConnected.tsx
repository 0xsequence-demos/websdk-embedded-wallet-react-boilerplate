import { useAccount, useDisconnect } from "wagmi";
import TestSignMessage from "../components/TestSignMessage";
import TestVerifyMessage from "../components/TestVerifyMessage";
import TestSendTransaction from "../components/TestSendTransaction";
import { Missing } from "../components/Missing";
import { NetworkSwitchInputSelect } from "../components/NetworkSwitchInputSelect";

import {
  Field,
  Group,
  Card,
  SegmentedInput,
  Input,
  ButtonLink,
  Svg,
  Label,
  Divider,
  ShowAddressWithDisconnect,
} from "boilerplate-design-system";
import { useNativeBalance } from "../components/ChainInfo/NativeBalance";

const MainConnected = () => {
  const { address, chain, chainId } = useAccount();
  const { disconnect } = useDisconnect();

  const balance = useNativeBalance({ chain, address });

  if (!address) {
    return <Missing>an address</Missing>;
  }
  if (!chain) {
    return <Missing>a chain</Missing>;
  }
  if (!chainId) {
    return <Missing>a chainId</Missing>;
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
              <SegmentedInput.Segment>
                <ButtonLink
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://faucet.circle.com/"
                  variant="tertiary"
                  className="self-center flex-shrink-0"
                >
                  <Svg name="ExternalLink" width="16" />
                  Get test currency
                </ButtonLink>
              </SegmentedInput.Segment>
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
