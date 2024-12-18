import { useMutation, useQuery } from "@tanstack/react-query";
import {
  registerAudienceContact,
  getAudienceRegistrationPublicStatus,
  isAudienceContactRegistered,
} from "../utils/audience";
import type { AudienceContact, WalletProof } from "@0xsequence/builder";

export const AUDIENCE_ID = Number(import.meta.env.VITE_AUDIENCE_ID);
export const PROJECT_ID = Number(import.meta.env.VITE_PROJECT_ID);

// Hook for checking registration status
export const useIsAudienceContactRegistered = () => {
  return useMutation({
    mutationKey: ["audienceRegistration"],
    mutationFn: (walletAddress: string) =>
      isAudienceContactRegistered(PROJECT_ID, AUDIENCE_ID, walletAddress),
  });
};

// Hook for getting public registration status
export const useAudienceRegistrationStatus = () => {
  return useQuery({
    queryKey: ["audienceStatus"],
    queryFn: () => getAudienceRegistrationPublicStatus(PROJECT_ID, AUDIENCE_ID),
  });
};

// Hook for registering a new contact
export const useRegisterAudienceContact = () => {
  return useMutation({
    mutationKey: ["registerAudience"],
    mutationFn: ({
      contact,
      walletProof,
    }: {
      contact: AudienceContact;
      walletProof: WalletProof;
    }) =>
      registerAudienceContact(PROJECT_ID, AUDIENCE_ID, contact, walletProof),
  });
};
