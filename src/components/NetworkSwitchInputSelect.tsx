import { InputSelect, setStoreData } from "boilerplate-design-system";
import { useSwitchChain } from "wagmi";

const SEQUENCE_ASSETS_URL_PREFIX = "https://assets.sequence.info/";
const VERSION = 5;
export const networkImageUrl = (
  chainId: number,
  size?: "small" | "medium" | "large",
) => {
  return (
    SEQUENCE_ASSETS_URL_PREFIX +
    `images/networks/${size}/${chainId}.webp?v${VERSION}`
  );
};

export function NetworkSwitchInputSelect({ chainId }: { chainId: string }) {
  const { chains, switchChainAsync } = useSwitchChain();

  function handleChainChange(value: string) {
    const onSwitchChain = async (chainId: string) => {
      const formmatedChainId = Number(chainId);
      await switchChainAsync({ chainId: formmatedChainId });
    };
    onSwitchChain(value);

    setStoreData("network", value);
  }

  return (
    <InputSelect
      name="network"
      defaultValue={chainId}
      onValueChange={handleChainChange}
      options={chains?.map((chain) => ({
        icon: networkImageUrl(chain.id, "small"),
        label: chain.name,
        value: chain.id.toString(),
      }))}
    />
  );
}
