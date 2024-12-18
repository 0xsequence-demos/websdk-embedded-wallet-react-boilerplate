import { useOpenConnectModal } from "@0xsequence/kit";

const Connector = () => {
  const { setOpenConnectModal } = useOpenConnectModal();

  return (
    <>
      <p>Not registered yet?</p>
      <div className="card">
        <button onClick={() => setOpenConnectModal(true)}>Register Now</button>
      </div>
    </>
  );
};

export default Connector;
