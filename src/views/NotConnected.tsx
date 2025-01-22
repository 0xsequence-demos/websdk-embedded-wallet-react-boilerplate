import { useOpenConnectModal } from "@0xsequence/kit";
import { Button } from "boilerplate-design-system";

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
