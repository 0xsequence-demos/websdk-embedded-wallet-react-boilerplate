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

interface TxnRespose {
  hash: string;
  network: Chain;
  error?: string;
  message?: string;
}

const TestSendTransaction = (props: { chainId: number }) => {
  const { data: walletClient } = useWalletClient();
  const { chainId } = props;
  const { sendTransactionAsync, isPending } = useSendTransaction();

  // Get chain information using chainId
  const network = chains.find((chain) => chain.id === chainId);

  const handleSendTransaction: FormHandler = async () => {
    const [account] = await walletClient!.getAddresses();
    try {
      const hash = await sendTransactionAsync({
        to: account,
        value: BigInt(0),
        gas: null,
      });

      return { data: { hash, network }, persist: true };
    } catch (e) {
      const error = e as Error;
      return {
        data: {
          error: "Unsuccessful transaction",
          message: error.message,
          hash: null,
          network,
        },
        persist: true,
      };
    }
  };

  const values = useStoreData<TxnRespose>("sendTransaction");

  const isTxnValid = values && values.hash && values.network;
  const isTxnInvalid =
    values && values.hash === null && values.network && values.error;

  return (
    <>
      <Card className="flex flex-col gap-4">
        <div>
          <span className="text-17">Send transaction on {network?.name}</span>
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
            <span>{!isPending ? `Send Test Transaction` : `Sending...`}</span>
          </Button>
        </Form>
      </Card>

      {isTxnInvalid ? (
        <Card className="flex flex-col gap-4">
          <dl className="flex flex-col gap-4">
            <div className="flex flex-col">
              <dt className="text-14 text-grey-100">
                Last transaction ({values.network.name})
              </dt>
              <dd className="w-full break-words font-mono text-13 ">
                Error: {values.error}
                <p className="mt-4 text-12">{values.message}</p>
              </dd>
            </div>
          </dl>
        </Card>
      ) : null}

      {isTxnValid ? (
        <Card className="flex flex-col gap-4">
          <dl className="flex flex-col gap-4">
            <div className="flex flex-col">
              <dt className="text-14 text-grey-100">
                Last transaction ({values.network.name})
              </dt>
              <dd className="w-full break-words font-mono text-13 ">
                Hash: {values.hash}
              </dd>
            </div>
          </dl>
          <a
            target="_blank"
            href={`${values?.network?.blockExplorers?.default?.url}/tx/${values.hash}`}
            rel="noreferrer noopener"
            className="underline text-14"
          >
            View on {values?.network?.name}
          </a>
        </Card>
      ) : null}
    </>
  );
};

export default TestSendTransaction;
