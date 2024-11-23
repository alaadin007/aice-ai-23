import jwt from 'jsonwebtoken';
import { config } from '../config';

export function generateToken(user: any): string {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      role: user.role 
    },
    config.jwtSecret,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export function generateSetupKey(): string {
  return `setup-${crypto.randomBytes(16).toString('hex')}`;
}