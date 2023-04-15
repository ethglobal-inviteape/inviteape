import { ALCHEMY_KEY, IS_MAINNET, WALLETCONNECT_PROJECT_ID } from 'data/constants';
import { ApolloProvider, webClient } from 'lens/apollo';
import { useEffect } from 'react';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, polygonMumbai } from 'wagmi/chains';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { Layout } from '@/components/Common/Layout';


const { chains, provider } = configureChains(
  [IS_MAINNET ? polygon : polygonMumbai, mainnet],
  [alchemyProvider({ apiKey: ALCHEMY_KEY })]
);

const connectors = () => {
  return [
    new InjectedConnector({ chains, options: { shimDisconnect: true } }),
    new WalletConnectConnector({
      options: {
        projectId: WALLETCONNECT_PROJECT_ID,
        showQrModal: true
      }
    })
  ];
};

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});

const queryClient = new QueryClient();
const apolloClient = webClient;

const Providers = ({ children }) => {
  useEffect(() => {
    // Do something
  }, []);

  return (
    <WagmiConfig client={wagmiClient}>
      <ApolloProvider client={apolloClient}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="light" attribute="class">
            <Layout>{children}</Layout>
          </ThemeProvider>
        </QueryClientProvider>
      </ApolloProvider>
    </WagmiConfig>
  );
};

export default Providers;
