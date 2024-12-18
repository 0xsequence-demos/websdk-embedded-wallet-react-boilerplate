import { useAccount } from "wagmi";

import "./Home.css";
import Connector from "./components/Connector";
import MainConnected from "./components/MainConnected";
import { Footer } from "./components/Footer";
import { useAudienceRegistrationStatus } from "./hooks/useAudience";
import { Box, Spinner } from "@0xsequence/design-system";

const Home = () => {
  const { isConnected } = useAccount();
  const { data: audienceRegistrationStatus, isLoading } =
    useAudienceRegistrationStatus();

  if (isLoading) {
    return (
      <Box
        alignItems="center"
        justifyContent="center"
        style={{ height: "100vh" }}
      >
        <Spinner />
      </Box>
    );
  }

  return (
    <div>
      <h1>Sequence Audience Starter - React</h1>
      <h2 className="homepage__marginBtNormal">Be part of an exclusive list</h2>
      <h2>
        Total Registrations: {audienceRegistrationStatus?.totalCount ?? 0}
      </h2>
      {isConnected ? <MainConnected /> : <Connector />}
      <Footer />
    </div>
  );
};

export default Home;
