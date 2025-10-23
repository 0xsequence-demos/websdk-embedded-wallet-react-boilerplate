import {
  Form,
  Button,
  Field,
  Input,
  Label,
  Card,
  FormErrors,
  FieldError,
  Svg,
  useStoreData,
  setStoreData,
  useForm,
} from "@0xsequence-demos/boilerplate-design-system";

import { usePublicClient } from "wagmi";
import { z } from "zod";
// import { type Signature } from "viem";
import type { FormHandler } from "@0xsequence-demos/boilerplate-design-system";
// Define Hex as a string with a hex pattern
const Hex = z.string().regex(/^0x[0-9a-fA-F]+$/, "Invalid hex format");

// SignatureLegacy schema
const SignatureLegacySchema = z.object({
  r: Hex,
  s: Hex,
  v: z.bigint(),
});

// Signature schema with OneOf variations
const SignatureSchema = z.union([
  SignatureLegacySchema,
  z.object({
    r: Hex,
    s: Hex,
    v: z.bigint(),
    yParity: z.number().optional(),
  }),
  z.object({
    r: Hex,
    s: Hex,
    v: z.bigint().optional(),
    yParity: z.number(),
  }),
]);

// Full form data schema
const schemaVerifyMessage = z.object({
  address: z
    .string()
    .regex(/^0x[0-9a-fA-F]{40}$/, "Invalid address format (0x...)"),
  message: z.string().min(1, { message: "Please include a message" }),
  signature: z.union([
    Hex, // Hex string starting with "0x"
    z.instanceof(Uint8Array),
    SignatureSchema, // Signature object
  ]),
});

const TestVerifyMessage = (props: { chainId: number }) => {
  const { chainId } = props;
  const publicClient = usePublicClient({ chainId });

  const handleVerifyMessage: FormHandler = async (_, data) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { address, message, signature } = data as Record<string, any>;

    if (!(address && message && signature)) return;

    /** Verify the message */
    try {
      setStoreData("verifyMessage", "pending");

      const isValid = await publicClient!.verifyMessage({
        address,
        message,
        signature,
      });

      const validMessage = isValid ? "valid" : "invalid";

      return { data: validMessage, persist: true };
    } catch {
      return { data: "idle", persist: true };
    }
  };

  const value =
    useStoreData<"valid" | "invalid" | "idle" | "pending">("verifyMessage") ||
    "idle";

  const { updateFields } = useForm();

  return (
    <div className="contents-layered">
      {" "}
      {value === "idle" ? (
        <Form
          name="verifyMessage"
          schema={schemaVerifyMessage}
          onAction={handleVerifyMessage}
          className="flex flex-col gap-4"
        >
          <FormErrors />
          <Field name="address">
            <Label>Address</Label>
            <Input className="w-full" />
            <FieldError />
          </Field>

          <Field name="message">
            <Label>Message</Label>
            <Input className="w-full" />
            <FieldError />
          </Field>

          <Field name="signature">
            <Label>Signature</Label>
            <Input className="w-full" />
            <FieldError />
          </Field>

          <Button
            type="submit"
            variant="primary"
            subvariants={{ padding: "comfortable" }}
            className="self-start"
          >
            Verify
          </Button>
        </Form>
      ) : (
        <Card className="flex flex-col">
          <div className="flex flex-1 items-center justify-center flex-col gap-4">
            <VerificationStatus isValidSignature={value} />
            <Button
              variant="tertiary"
              onClick={() => {
                updateFields("verifyMessage", {
                  address: "",
                  message: "",
                  signature: "",
                });
                setStoreData("verifyMessage", "idle");
              }}
            >
              Reset
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

function VerificationStatus({
  isValidSignature,
}: {
  isValidSignature: "valid" | "invalid" | "idle" | "pending";
}) {
  switch (isValidSignature) {
    case "idle":
      return <span>Nothing verified yet</span>;

    case "pending":
      return <span className="gap-2 flex items-center">Verifying...</span>;

    case "valid":
      return (
        <span className="flex gap-2 items-center">
          <span className="flex items-center justify-center size-6 rounded-full bg-indigo-500">
            <Svg name="Checkmark" className="size-4" />
          </span>
          Signature is valid
        </span>
      );

    case "invalid":
      return (
        <span className="flex gap-2 items-center">
          <span className="flex items-center justify-center size-6 rounded-full bg-orange-500">
            <Svg name="Close" className="size-4" />
          </span>
          Signature is invalid
        </span>
      );

    default:
      return <>Signature validity is unknown</>;
  }
}

export default TestVerifyMessage;
