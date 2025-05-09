import { useOpenConnectModal } from "@0xsequence/connect";
import { Button } from "@0xsequence-demos/boilerplate-design-system";

export function TestLinkWallet() {
  const { setOpenConnectModal } = useOpenConnectModal();

  return (
    <div className="flex flex-col items-center w-full">
      <Button
        variant="primary"
        className="cursor-pointer"
        subvariants={{ padding: "comfortable" }}
        onClick={() => setOpenConnectModal(true)}
      >
        Link Wallet
      </Button>
    </div>
  );
}
