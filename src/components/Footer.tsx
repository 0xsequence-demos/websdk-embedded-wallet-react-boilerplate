import { Text } from "@0xsequence/design-system";

export const Footer = () => {
  return (
    <footer className="homepage__footer">
      <Text>
        Want to learn more? Read the{" "}
        <a
          href={
            "https://docs.sequence.xyz/api/builder/endpoints/#tag/default/POST/rpc/Builder/"
          }
          target="_blank"
          rel="noreferrer "
        >
          docs
        </a>
        !
      </Text>
    </footer>
  );
};
