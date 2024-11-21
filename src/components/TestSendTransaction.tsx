import { Box, Text } from "@0xsequence/design-system";
import { useEffect, useState } from "react";
import { Chain } from "viem";
import { useSendTransaction, useWalletClient } from "wagmi";
import chains from "../constants";
import CardButton from "./CardButton";
import ErrorToast from "./ErrorToast";

const TestSendTransaction = (props: { chainId: number }) => {
  const { data: walletClient } = useWalletClient();
  const { chainId } = props;
  const [network, setNetwork] = useState<Chain | null>(null);
  const {
    data: txnData,
    sendTransaction,
    isPending: isPendingSendTxn,
    error,
    reset,
  } = useSendTransaction();
  const [lastTransaction, setLastTransaction] = useState<string | null>(null);

  useEffect(() => {
    if (txnData) {
      setLastTransaction(txnData);
    }
    if (error) console.error(error);
  }, [txnData, error]);

  useEffect(() => {
    const chainResult = chains.find((chain) => chain.id === chainId);
    if (chainResult) {
      setNetwork(chainResult);
    }
  }, [chainId]);

  const runSendTransaction = async () => {
    const [account] = await walletClient!.getAddresses();
    // The gas limit defines the maximum amount of gas that can be used for a transaction.
    // If the transaction requires more gas than the set limit, it will fail.
    // Posible sendTransaction values: { to: account, value: BigInt(0), gas: null }
    sendTransaction({ to: account, value: BigInt(0) });
  };

  return (
    <>
      <CardButton
        title="Send transaction"
        description="Send a transaction with your wallet"
        isPending={isPendingSendTxn}
        onClick={runSendTransaction}
      />
      {lastTransaction && (
        <Box display="flex" flexDirection="column" gap="4">
          <Text>Last transaction hash: {lastTransaction}</Text>
          <button>
            <a
              target="_blank"
              href={`${network?.blockExplorers?.default?.url}/tx/${lastTransaction}`}
              rel="noreferrer"
            >
              Click to view on {network?.name}
            </a>
          </button>
        </Box>
      )}
      {error && (
        <ErrorToast message={error?.message} onClose={reset} duration={7000} />
      )}
    </>
  );
};

export default TestSendTransaction;
