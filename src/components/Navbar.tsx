import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const Navbar = () => {
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
        <ConnectButton />
      </Flex>
    </Box>
  )
}

export default Navbar 