import {
  Form,
  Button,
  InputText,
  Card,
  useStoreData,
  setStoreData,
  useForm,
} from "boilerplate-design-system";
import { useAccount, useSignMessage } from "wagmi";
import { SignableMessage } from "viem";
import type { FormHandler } from "boilerplate-design-system";
import { z } from "zod";

const schemaSignMessage = z.object({
  message: z.string().min(1, "Please provide a message"),
});

const TestSignMessage = () => {
  const { isPending, signMessageAsync } = useSignMessage();

  // Handle form post
  const handleSignMessage: FormHandler = async (_, formValues) => {
    const { message } = formValues as { message: SignableMessage };
    if (!message) return;

    const signature = await signMessageAsync({ message }).then((res) => res);
    return { data: { signature, message }, persist: true };
  };

  // Get the session storage for signMessage (set by form)
  const values = useStoreData<{ signature: string; message: string }>(
    "signMessage",
  ) || { signature: null, message: null };

  const { address } = useAccount();

  const { updateFields } = useForm();

  return (
    <div className="grid grid-cols-1 grid-rows-1">
      {!values?.signature ? (
        <Form
          name="signMessage"
          schema={schemaSignMessage}
          onAction={handleSignMessage}
          className="flex flex-col gap-4 col-start-1 row-start-1 data-[visible='false']:invisible"
        >
          <InputText name="message" />

          <Button
            type="submit"
            variant="primary"
            subvariants={{ padding: "comfortable" }}
            disabled={isPending}
            className="self-start disabled:opacity-50"
          >
            {isPending ? "Signing..." : "Sign"}
          </Button>
        </Form>
      ) : (
        <Card className="col-start-1 row-start-1 data-[visible='false']:hidden flex flex-col items-start gap-4">
          <dl className="flex flex-col gap-4 w-full">
            <div className="flex flex-col">
              <dt className="text-14 text-grey-100 ">Address</dt>
              <dd className="font-mono text-13">{address}</dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-14 text-grey-100">Message</dt>
              <dd>{values.message}</dd>
            </div>
            <div className="flex flex-col w-full">
              <dt className="text-14 text-grey-100">Signature</dt>
              <dd className="w-full break-words font-mono text-13 ">
                {values.signature}
              </dd>
            </div>
          </dl>

          <div className="flex gap-2 items-center">
            <Button
              variant="tertiary"
              onClick={() => {
                updateFields("signMessage", {
                  message: "",
                  signature: "",
                });
                setStoreData("signMessage", { message: null, signature: null });
              }}
            >
              Clear
            </Button>

            <Button
              variant="tertiary"
              onClick={() => {
                // Update field value
                updateFields("verifyMessage", {
                  address,
                  ...(values || {}),
                } as Record<string, string>);

                // Close sign message modal
                const signMessageDetails = document.querySelector(
                  "[data-id='sign-message']",
                );

                if (
                  signMessageDetails &&
                  signMessageDetails.hasAttribute("open")
                ) {
                  const summary = signMessageDetails.querySelector("summary");
                  if (summary && summary?.click) {
                    summary.click();
                  }
                }

                // Open verify message modal
                const verifyMessageDetails = document.querySelector(
                  "[data-id='verify-message']",
                );
                if (
                  verifyMessageDetails &&
                  !verifyMessageDetails?.hasAttribute("open")
                ) {
                  const summary = verifyMessageDetails.querySelector("summary");
                  if (summary && summary?.click) {
                    summary.click();
                  }
                }
              }}
            >
              Verify message
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default TestSignMessage;
