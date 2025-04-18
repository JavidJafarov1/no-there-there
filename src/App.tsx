import { Box, Container, Heading, Text, SimpleGrid, useColorModeValue } from '@chakra-ui/react'
import '@rainbow-me/rainbowkit/styles.css'
import './styles/App.css'
import {
  RainbowKitProvider,
  getDefaultConfig,
  lightTheme,
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
          theme={lightTheme({
            accentColor: '#7b3fe4',
            accentColorForeground: 'white',
            borderRadius: 'medium',
          })}
        >
          <Navbar />
          <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
            <Container maxW="container.xl" py={16}>
              <Box
                textAlign="center"
              mb={16}
              position="relative"
              _before={{
                content: '""',
                position: 'absolute',
                top: '-30px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '200px',
                height: '6px',
                bgGradient: 'linear(to-r, purple.500, pink.500)',
                borderRadius: 'full',
                boxShadow: '0 0 20px rgba(159, 122, 234, 0.3)'
              }}
              _after={{
                content: '""',
                position: 'absolute',
                bottom: '-30px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '200px',
                height: '6px',
                bgGradient: 'linear(to-r, pink.500, purple.500)',
                borderRadius: 'full',
                boxShadow: '0 0 20px rgba(237, 100, 166, 0.3)'
              }}
            >
              <Heading
                as="h1"
                fontSize={{ base: "6xl", md: "7xl", lg: "8xl" }}
                bgGradient="linear(to-r, purple.400, pink.400, purple.400)"
                bgClip="text"
                letterSpacing="tight"
                fontWeight="black"
                textShadow="0 4px 12px rgba(0,0,0,0.15)"
                transition="all 0.4s"
                transform="perspective(1000px)"
                _hover={{
                  bgGradient: "linear(to-r, pink.400, purple.400, pink.400)",
                  transform: "perspective(1000px) scale(1.05) translateY(-5px)",
                  letterSpacing: "wider",
                  textShadow: "0 6px 20px rgba(0,0,0,0.2)"
                }}
              >
                No there, there
              </Heading>
              <Text
                fontSize={{ base: "xl", md: "2xl" }}
                mt={6}
                fontWeight="bold"
                letterSpacing="wide"
                bgGradient="linear(to-r, purple.600, pink.600)"
                bgClip="text"
                opacity={0.9}
                maxW="2xl"
                mx="auto"
                transform="translateY(0)"
                transition="all 0.3s"
                _hover={{
                  transform: "translateY(-2px)",
                  opacity: 1
                }}
              >
                Explore the decentralized frontier
              </Text>
            </Box>
            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              spacing={10}
              mt={16}
            >
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
