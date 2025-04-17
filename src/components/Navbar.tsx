import { Box, Flex, Text, Button, useColorModeValue } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import SocialVerification from './SocialVerification'
import { useAuth } from '../hooks/useAuth'

const Navbar = () => {
  const { isConnected } = useAccount()
  const { isAuthenticated, isAuthenticating, authenticate, logout } = useAuth()

  return (
    <Box
      as="nav"
      bg={useColorModeValue('white', 'gray.800')}
      px={4}
      boxShadow="sm"
    >
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        maxW="container.2xl"
        mx="auto"
      >
        <Text
          fontSize="xl"
          fontWeight="bold"
          bgGradient="linear(to-r, purple.500, pink.500)"
          bgClip="text"
          transition="all 0.3s ease"
          _hover={{
            transform: 'translateY(-1px)',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          Web3 App
        </Text>
        <Flex gap={4} alignItems="center">
          {isConnected && !isAuthenticated && (
            <Button
              onClick={authenticate}
              isLoading={isAuthenticating}
              loadingText="Authenticating"
              colorScheme="purple"
            >
              Authenticate
            </Button>
          )}
          {isAuthenticated && (
            <>
              <SocialVerification isConnected={isConnected} />
              <Button
                onClick={logout}
                variant="ghost"
                colorScheme="purple"
              >
                Logout
              </Button>
            </>
          )}
          <ConnectButton />
        </Flex>
      </Flex>
    </Box>
  )
}

export default Navbar 