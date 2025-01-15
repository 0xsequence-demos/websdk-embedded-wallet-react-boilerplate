import { useEffect, useMemo, useState } from "react";
import { Chain } from "viem";
import { useSendTransaction, useWalletClient } from "wagmi";
import chains from "../constants";
import {
  Button,
  Card,
  Form,
  FormHandler,
  useStoreData,
} from "boilerplate-design-system";

const TestSendTransaction = (props: { chainId: number }) => {
  const { data: walletClient } = useWalletClient();
  const { chainId } = props;
  const [network, setNetwork] = useState<Chain | null>(null);
  const {
    data: txnData,
    sendTransactionAsync,
    isPending,
    error,
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

  const handleSendTransaction: FormHandler = async () => {
    const [account] = await walletClient!.getAddresses();
    const data = await sendTransactionAsync({
      to: account,
      value: BigInt(0),
      gas: null,
    });

    return [{ data }, true];
  };

  const values = useStoreData<string>("sendTransaction");

  const lastTransactionNetwork = useMemo(() => network, [lastTransaction]);

  return (
    <>
      <Card className="flex flex-col gap-4">
        <div>
          <span className="text-17">Send transaction</span>
          <p className="text-14 text-grey-100">
            Send a transaction with your wallet
          </p>
        </div>

        <Form name="sendTransaction" onAction={handleSendTransaction}>
          <Button
            type="submit"
            variant="primary"
            subvariants={{ padding: "comfortable" }}
            className="self-start disabled:opacity-50 contents-layered"
            disabled={isPending}
          >
            <span data-visible={!isPending}>Send Test Transaction</span>
            <span data-visible={isPending}>Sending...</span>
          </Button>
        </Form>
      </Card>

      {lastTransaction ? (
        <Card className="flex flex-col gap-4">
          <dl className="flex flex-col gap-4">
            <div className="flex flex-col">
              <dt className="text-14 text-grey-100">Last transaction hash</dt>
              <dd className="w-full break-words font-mono text-13 ">
                {values}
              </dd>
            </div>
          </dl>
          <a
            target="_blank"
            href={`${lastTransactionNetwork?.blockExplorers?.default?.url}/tx/${lastTransaction}`}
            rel="noreferrer noopener"
            className="underline text-14"
          >
            View on {lastTransactionNetwork?.name}
          </a>
        </Card>
      ) : null}
    </>
  );
};

export default TestSendTransaction;
