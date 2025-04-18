import { Box, Container, Heading } from '@chakra-ui/react'
import { WagmiConfig, createConfig } from 'wagmi'
import { createPublicClient, http } from 'viem'
import { mainnet } from 'wagmi/chains'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import Navbar from './components/Navbar'

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http()
  }),
  connectors: [
    new MetaMaskConnector(),
    new CoinbaseWalletConnector({
      options: {
        appName: 'Web3 App',
      },
    }),
  ],
})

function App() {
  return (
    <WagmiConfig config={config}>
      <Box minH="100vh" bg="gray.50">
        <Navbar />
        <Container maxW="container.xl" py={8}>
          <Heading>Welcome to Web3</Heading>
          {/* Add your components here */}
        </Container>
      </Box>
    </WagmiConfig>
  )
}

export default App
