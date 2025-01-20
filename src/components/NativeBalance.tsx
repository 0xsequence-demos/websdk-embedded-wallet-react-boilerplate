import { SequenceIndexer } from "@0xsequence/indexer";
import { allNetworks } from "@0xsequence/network";
import { useEffect, useState } from "react";
import { Address, Chain } from "viem";

const projectAccessKey = import.meta.env.NEXT_PUBLIC_PROJECT_ACCESS_KEY;

export const useNativeBalance = (props: {
  chain?: Chain;
  address?: Address;
}) => {
  const { chain, address } = props;

  if (!chain || !address) {
    return undefined;
  }

  const [balance, setBalance] = useState<string | undefined>();

  useEffect(() => {
    if (!address || !chain) return;

    const loadNativeNetworkBalance = async (chainId: number) => {
      const chainName = allNetworks.find(
        (chainInfo) => chainInfo.chainId === chainId,
      )?.name;
      if (!chainName) {
        setBalance("ERROR");
        return;
      }
      const indexer = new SequenceIndexer(
        `https://${chainName}-indexer.sequence.app`,
        projectAccessKey,
      );

      const tokenBalances = await indexer.getEtherBalance({
        accountAddress: address,
      });
      if (tokenBalances) setBalance(tokenBalances?.balance?.balanceWei);
    };

    loadNativeNetworkBalance(chain.id).then(() => console.log("Done"));
  }, [address, chain]);

  return balance || "loading...";
};
