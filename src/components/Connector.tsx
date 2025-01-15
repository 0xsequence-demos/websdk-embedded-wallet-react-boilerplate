import { useOpenConnectModal } from "@0xsequence/kit";
import { Button, Card } from "boilerplate-design-system";

const Connector = () => {
  const { setOpenConnectModal } = useOpenConnectModal();

  return (
    <Card variant="none">
      <Button
        variant="primary"
        subvariants={{ padding: "comfortable" }}
        onClick={() => setOpenConnectModal(true)}
      >
        Connect
      </Button>
    </Card>
  );
};

export default Connector;
