import { Request } from 'express';

export interface User {
  address: string;
  nonce: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface JWTPayload {
  address: string;
  iat?: number;
  exp?: number;
}

export interface AuthRequest extends Request {
  user?: JWTPayload;
} 