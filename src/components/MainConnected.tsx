import { Box, Spinner, Text } from "@0xsequence/design-system";
import { useAccount } from "wagmi";
import Disconnector from "./Disconnector";
import { useRegisterUser } from "../hooks/useRegisterUser";

const MainConnected = () => {
  const { address } = useAccount();
  const { isRegistered, isLoading } = useRegisterUser();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Spinner />
      </Box>
    );
  }

  return (
    <>
      {isRegistered ? (
        <Text variant="large" fontWeight="bold" color="text100">
          Registered with address: {address}
        </Text>
      ) : (
        <Text variant="large" fontWeight="bold" color="text100">
          Not registered yet
        </Text>
      )}
      <Disconnector />
    </>
  );
};

export default MainConnected;
