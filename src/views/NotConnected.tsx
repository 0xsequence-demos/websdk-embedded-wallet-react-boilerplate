import { useOpenConnectModal } from "@0xsequence/connect";
import { Button } from "@0xsequence-demos/boilerplate-design-system";

export function NotConnected() {
  const { setOpenConnectModal } = useOpenConnectModal();

  return (
    <div className="flex flex-col items-center w-full">
      <Button
        variant="primary"
        subvariants={{ padding: "comfortable" }}
        onClick={() => setOpenConnectModal(true)}
      >
        Connect
      </Button>
    </div>
  );
}
