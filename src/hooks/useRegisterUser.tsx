import { useCallback, useEffect, useState } from "react";
import { useAccount, useSignMessage } from "wagmi";
import {
  AUDIENCE_ID,
  useIsAudienceContactRegistered,
  useRegisterAudienceContact,
} from "./useAudience";
import { useSignInEmail } from "@0xsequence/kit";
import { useToast } from "@0xsequence/design-system";
import { useQueryClient } from "@tanstack/react-query";

export const useRegisterUser = () => {
  const { signMessageAsync } = useSignMessage();
  const { address, chainId } = useAccount();
  const { mutateAsync: isAudienceContactRegistered } =
    useIsAudienceContactRegistered();
  const { mutateAsync: registerAudienceContact } = useRegisterAudienceContact();
  const email = useSignInEmail();
  const toast = useToast();
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const registerUser = useCallback(async () => {
    try {
      setIsLoading(true);

      if (!address || !chainId) {
        throw new Error("No address found");
      }

      const registered = await isAudienceContactRegistered(address);

      if (!registered) {
        const message = "wallet with address " + address;
        const response = await signMessageAsync({
          message: message,
        });

        const proof = {
          address: address,
          message: message,
          signature: response,
          chainId: chainId,
        };

        if (!proof || !proof.signature) {
          return;
        }

        await registerAudienceContact({
          contact: { address: address, email: email!, audienceId: AUDIENCE_ID },
          walletProof: proof,
        });

        toast({
          title: "User registered",
          description: "User registered successfully",
          variant: "success",
        });

        queryClient.invalidateQueries({ queryKey: ["audienceStatus"] });
      }
      setIsRegistered(true);
    } catch (error) {
      console.error(error);

      toast({
        title: "Error",
        description: "Error registering user",
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }, [
    address,
    chainId,
    email,
    isAudienceContactRegistered,
    queryClient,
    registerAudienceContact,
    signMessageAsync,
    toast,
  ]);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      if (!isMounted || !email) return;
      await registerUser();
    })();

    return () => {
      isMounted = false;
    };
  }, [email]);

  return { isRegistered, isLoading };
};
