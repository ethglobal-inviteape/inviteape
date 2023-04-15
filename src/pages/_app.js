import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import "tailwindcss/tailwind.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, goerli, hardhat } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const { chains, provider } = configureChains(
  [mainnet, goerli, hardhat],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "dApp",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <QueryClientProvider client={queryClient}>
          <div className="flex flex-row-reverse mr-6">
            <ConnectButton />
          </div>
          <div
            className="-mt-[40px] w-96 mx-auto px-8 min-h-screen flex flex-col shadow-md overflow-y-auto overflow-x-auto border-black bg-[#211D1D] text-white">
            <Component {...pageProps} />
          </div>
        </QueryClientProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
