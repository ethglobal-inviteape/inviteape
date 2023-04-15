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
    <div className="flex flex-col content-center justify-center items-center">
      <div className="text-white text-5xl my-20">InviteApe</div>
      <button
        className="bg-green-700 w-85 h-48 rounded-3xl text-2xl text-white border-2 border-transparent hover:border-green-500"
        style={{
          width: "349px",
          height: "190px",
        }}
        onClick={() => {
          connectWalletRedirectToCreateEvent();
        }}
      >
        Create Event
      </button>
      <button
        className="mt-4 bg-orange-600 w-85 h-48 rounded-3xl text-2xl text-white border-2 border-transparent hover:border-yellow-500"
        style={{
          width: "349px",
          height: "190px",
        }}
        onClick={() => {
          connectWalletRedirectToBrowseEvent();
        }}
      >
        Browse Event
      </button>
    </div>
  );
}
