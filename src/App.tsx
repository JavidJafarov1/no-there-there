import { Box, Container, Heading } from '@chakra-ui/react'
import '@rainbow-me/rainbowkit/styles.css'
import {
  RainbowKitProvider,
  getDefaultConfig,
  darkTheme,
} from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
} from 'wagmi/chains'

import Navbar from './components/Navbar'

const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID

const config = getDefaultConfig({
  appName: 'Web3 App',
  projectId,
  chains: [mainnet, polygon, optimism, arbitrum, base, zora],
  ssr: true,
})

const queryClient = new QueryClient()

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: '#7b3fe4',
            accentColorForeground: 'white',
            borderRadius: 'medium',
          })}
        >
          <Box minH="100vh" bg="gray.50">
            <Navbar />
            <Container maxW="container.xl" py={8}>
              <Heading>Welcome to Web3</Heading>
              {/* Add your components here */}
            </Container>
          </Box>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
