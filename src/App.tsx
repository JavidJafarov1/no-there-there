import { Box, Container, Heading, SimpleGrid } from '@chakra-ui/react'
import '@rainbow-me/rainbowkit/styles.css'
import {
  RainbowKitProvider,
  getDefaultConfig,
  darkTheme,
} from '@rainbow-me/rainbowkit'
import { FaEthereum, FaUsers, FaLock } from 'react-icons/fa'
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
import Feature from './components/Feature'

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
              <Heading
                fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                textAlign="center"
                mb={8}
                bgGradient="linear(to-r, purple.500, pink.500)"
                bgClip="text"
                letterSpacing="tight"
                fontWeight="extrabold"
                textShadow="0 2px 4px rgba(0,0,0,0.1)"
                transition="all 0.3s ease"
                _hover={{
                  bgGradient: "linear(to-r, pink.500, purple.500)",
                  transform: "scale(1.02)",
                }}
              >
                No there, there
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} mt={16}>
                <Feature
                  title="Blockchain Integration"
                  text="Connect with your wallet or social account for secure authentication and seamless gameplay."
                  icon={FaEthereum}
                />
                <Feature
                  title="Real-time Multiplayer"
                  text="Play with other players in real-time with smooth synchronization and minimal latency."
                  icon={FaUsers}
                />
                <Feature
                  title="Secure & Scalable"
                  text="Built with modern technologies ensuring security and scalability for a growing player base."
                  icon={FaLock}
                />
              </SimpleGrid>
            </Container>
          </Box>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
