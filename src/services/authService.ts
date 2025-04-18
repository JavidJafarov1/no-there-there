import { getAddress } from 'viem'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export interface AuthResponse {
  token: string
  user: {
    address: string
    nonce: string
  }
}

export const authService = {
  async getNonce(address: string): Promise<string> {
    try {
      const response = await fetch(`${API_URL}/auth/nonce?address=${address}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.nonce;
    } catch (error) {
      console.error('Error getting nonce:', error);
      throw new Error('Failed to get nonce');
    }
  },

  async verifySignature(address: string, signature: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/auth/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ address, signature }),
      });
      
      if (!response.ok) {
        throw new Error('Verification failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Error verifying signature:', error);
      throw new Error('Failed to verify signature');
    }
  },

  async signMessage(message: string, address: string): Promise<string> {
    try {
      // Request signature from wallet
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, address],
      });
      return signature;
    } catch (error) {
      console.error('Error signing message:', error);
      throw new Error('Failed to sign message');
    }
  },

  isValidAddress(address: string): boolean {
    try {
      getAddress(address); // This will throw if the address is invalid
      return true;
    } catch {
      return false;
    }
  },
} 