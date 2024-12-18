import Home from "./Home";
import { SequenceKit } from "@0xsequence/kit";
import { config } from "./config";
import "@0xsequence/design-system/styles.css";
import { ToastProvider } from "@0xsequence/design-system";

const App = () => {
  return (
    <ToastProvider swipeDirection="right" duration={2000}>
      <SequenceKit config={config}>
        <Home />
      </SequenceKit>
    </ToastProvider>
  );
};

export default App;
