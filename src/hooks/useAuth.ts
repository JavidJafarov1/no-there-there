import { useState, useCallback } from 'react'
import { useAccount, useDisconnect } from 'wagmi'
import { authService } from '../services/authService'
import { useToast } from '@chakra-ui/react'

export const useAuth = () => {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const toast = useToast()

  const authenticate = useCallback(async () => {
    if (!address) return

    setIsAuthenticating(true)
    try {
      // Get nonce from backend
      const nonce = await authService.getNonce(address)
      
      // Create the message for signing
      const message = `Welcome to Web3 App!\n\nPlease sign this message to verify your identity.\n\nNonce: ${nonce}`
      
      // Request signature from wallet
      const signature = await authService.signMessage(message, address)
      
      // Verify signature with backend
      const { token } = await authService.verifySignature(address, signature)
      
      // Store the token
      localStorage.setItem('auth_token', token)
      setIsAuthenticated(true)

      toast({
        title: 'Authentication Successful',
        description: 'You have successfully authenticated with your wallet!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch (error) {
      console.error('Authentication error:', error)
      toast({
        title: 'Authentication Failed',
        description: error instanceof Error ? error.message : 'Failed to authenticate',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsAuthenticating(false)
    }
  }, [address, toast])

  const logout = useCallback(() => {
    localStorage.removeItem('auth_token')
    setIsAuthenticated(false)
    disconnect()
  }, [disconnect])

  return {
    isAuthenticated,
    isAuthenticating,
    authenticate,
    logout,
  }
} 