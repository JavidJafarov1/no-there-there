import { Request, Response } from 'express';
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';
import { verifyMessage } from 'viem';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import crypto from 'crypto';

// In-memory store for nonces (replace with a database in production)
const nonceStore = new Map<string, string>();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '24h';

// Validation schemas
const addressSchema = z.string().regex(/^0x[a-fA-F0-9]{40}$/);
const signatureSchema = z.string().regex(/^0x[a-fA-F0-9]{130}$/);

export const getNonce = async (req: Request, res: Response) => {
  try {
    const address = addressSchema.parse(req.query.address);
    
    // Generate a random nonce
    const nonce = crypto.randomBytes(32).toString('hex');
    nonceStore.set(address.toLowerCase(), nonce);

    return res.json({ nonce });
  } catch (error) {
    console.error('Error generating nonce:', error);
    return res.status(400).json({ error: 'Invalid address' });
  }
};

export const verifySignature = async (req: Request, res: Response) => {
  try {
    const { address, signature } = req.body;
    
    // Validate input
    const validAddress = addressSchema.parse(address);
    const validSignature = signatureSchema.parse(signature);
    
    // Get stored nonce
    const nonce = nonceStore.get(validAddress.toLowerCase());
    if (!nonce) {
      return res.status(400).json({ error: 'No nonce found for this address' });
    }

    // Create the message that was signed
    const message = `Welcome to Web3 App!\n\nPlease sign this message to verify your identity.\n\nNonce: ${nonce}`;

    // Verify the signature
    const isValid = await verifyMessage({
      message,
      signature: validSignature as `0x${string}`,
      address: validAddress as `0x${string}`,
    });

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid signature' });
    }

    // Clear the used nonce
    nonceStore.delete(validAddress.toLowerCase());

    // Generate JWT
    const token = jwt.sign(
      { address: validAddress },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return res.json({
      token,
      user: {
        address: validAddress,
        nonce
      }
    });
  } catch (error) {
    console.error('Error verifying signature:', error);
    return res.status(400).json({ error: 'Invalid request' });
  }
}; 