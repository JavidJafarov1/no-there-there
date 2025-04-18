import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

const Navbar = () => {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()

  const handleConnect = async () => {
    try {
      await connect({ connector: new MetaMaskConnector() })
    } catch (error) {
      console.error('Failed to connect wallet:', error)
    }
  }

  return (
    <Box bg="white" px={4} shadow="sm">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Text fontSize="xl" fontWeight="bold">
          Web3 App
        </Text>
        {isConnected ? (
          <Flex alignItems="center" gap={4}>
            <Text>{`${address?.slice(0, 6)}...${address?.slice(-4)}`}</Text>
            <Button colorScheme="red" onClick={() => disconnect()}>
              Disconnect
            </Button>
          </Flex>
        ) : (
          <Button colorScheme="blue" onClick={handleConnect}>
            Connect Wallet
          </Button>
        )}
      </Flex>
    </Box>
  )
}

export default Navbar 