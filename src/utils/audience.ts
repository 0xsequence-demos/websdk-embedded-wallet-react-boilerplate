import {
  AudienceContact,
  AudienceRegistrationStatus,
  SequenceBuilderClient,
  WalletProof,
} from "@0xsequence/builder";

const builderRpcClient = new SequenceBuilderClient(
  String(import.meta.env.VITE_PROJECT_ACCESS_KEY),
  "http://localhost:8080/https://api.sequence.build/",
);

export const registerAudienceContact = async (
  projectId: number,
  audienceId: number,
  contact: AudienceContact,
  walletProof: WalletProof,
): Promise<boolean> => {
  const { ok } = await builderRpcClient.registerAudienceContact({
    projectId,
    audienceId,
    contact,
    walletProof,
  });
  return ok;
};

export const getAudienceRegistrationPublicStatus = async (
  projectId: number,
  audienceId: number,
): Promise<AudienceRegistrationStatus> => {
  const { status } = await builderRpcClient.getAudienceRegistrationPublicStatus(
    {
      projectId,
      audienceId,
    },
  );
  return status;
};

export const isAudienceContactRegistered = async (
  projectId: number,
  audienceId: number,
  walletAddress: string,
): Promise<boolean> => {
  const { registered } = await builderRpcClient.isAudienceContactRegistered({
    projectId,
    audienceId,
    walletAddress,
  });
  return registered;
};
