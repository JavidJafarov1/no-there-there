import { useState, useEffect } from 'react'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  Text,
  useToast,
  Box,
  Icon,
} from '@chakra-ui/react'
import { FaTwitter, FaDiscord, FaGithub } from 'react-icons/fa'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3003'

interface SocialVerificationProps {
  isConnected: boolean
}

interface VerificationStatus {
  [key: string]: {
    verified: boolean
    username?: string
  }
}

const SocialVerification = ({ isConnected }: SocialVerificationProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>({
    Twitter: { verified: false },
    Discord: { verified: false },
    GitHub: { verified: false },
  })

  useEffect(() => {
    // Handle OAuth callbacks
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search)
      const platform = window.location.pathname.split('/')[1]
      const code = urlParams.get('code')
      const oauthToken = urlParams.get('oauth_token')
      const oauthVerifier = urlParams.get('oauth_verifier')

      if (code || (oauthToken && oauthVerifier)) {
        try {
          const token = localStorage.getItem('auth_token')
          const response = await fetch(`${API_URL}/social/${platform}/callback${window.location.search}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          const data = await response.json()
          if (data.success) {
            setVerificationStatus(prev => ({
              ...prev,
              [data.platform]: {
                verified: true,
                username: data.username,
              },
            }))

            toast({
              title: 'Verification Successful',
              description: `Your ${data.platform} account has been verified!`,
              status: 'success',
              duration: 5000,
              isClosable: true,
            })
          }
        } catch (error) {
          toast({
            title: 'Verification Failed',
            description: 'Failed to verify social account',
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        }

        // Clean up URL
        window.history.replaceState({}, document.title, '/')
      }
    }

    handleCallback()
  }, [toast])

  const handleSocialVerification = async (platform: string) => {
    try {
      const token = localStorage.getItem('auth_token')
      const response = await fetch(`${API_URL}/social/${platform.toLowerCase()}/auth`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to initiate ${platform} verification`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  const SocialButton = ({ platform, icon }: { platform: string; icon: any }) => (
    <Button
      leftIcon={<Icon as={icon} />}
      onClick={() => handleSocialVerification(platform)}
      colorScheme={verificationStatus[platform]?.verified ? 'green' : 'gray'}
      width="full"
      isDisabled={!isConnected}
    >
      {verificationStatus[platform]?.verified
        ? `${platform} Verified (${verificationStatus[platform]?.username})`
        : `Verify with ${platform}`}
    </Button>
  )

  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme="purple"
        variant="outline"
        isDisabled={!isConnected}
      >
        Social Verification
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Verify Social Accounts</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {!isConnected ? (
              <Text color="red.500">Please connect your wallet first</Text>
            ) : (
              <VStack spacing={4}>
                <Box w="full">
                  <Text mb={2} fontWeight="medium">
                    Connect your social accounts to verify your identity
                  </Text>
                  <SocialButton platform="Twitter" icon={FaTwitter} />
                </Box>
                <Box w="full">
                  <SocialButton platform="Discord" icon={FaDiscord} />
                </Box>
                <Box w="full">
                  <SocialButton platform="GitHub" icon={FaGithub} />
                </Box>
                <Text fontSize="sm" color="gray.500">
                  Verified platforms: {Object.values(verificationStatus).filter(s => s.verified).length}/3
                </Text>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default SocialVerification 