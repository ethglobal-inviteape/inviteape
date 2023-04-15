import { useConnect, useAccount } from "wagmi";
import Router from "next/router";

export default function Home() {
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();

  const connectWalletRedirectToCreateEvent = () => {
    _checkWalletConnection();

    if (isConnected) Router.push("/create");
  };
  const connectWalletRedirectToBrowseEvent = () => {
    _checkWalletConnection();

    if (isConnected) Router.push("/browse");
  };

  const _checkWalletConnection = () => {
    const metamask = connectors[3];

    connect({ connector: metamask });
  };

  return (
    <div>
      <button
        onClick={() => {
          connectWalletRedirectToCreateEvent();
        }}
      >
        Create
      </button>
      <button
        onClick={() => {
          connectWalletRedirectToBrowseEvent();
        }}
      >
        Browse
      </button>
    </div>
  );
}
