import config from '../configs/config';
import jwt, { JwtPayload } from 'jsonwebtoken';
const {
  jwt: { privateKey, publicKey }
} = config;

export function signJwt(object: Record<string, unknown>, options?: jwt.SignOptions | undefined): string {
  return jwt.sign(object, privateKey, {
    ...(options != null && options),
    algorithm: 'RS256'
  });
}
export function verifyJwt(
  token: string
): { valid: boolean; expired: boolean; decoded: jwt.JwtPayload } | { valid: boolean; expired: boolean; decoded: null } {
  try {
    const decoded = jwt.verify(token, publicKey) as JwtPayload;
    return {
      valid: true,
      expired: false,
      decoded
    };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === 'jwt expired',
      decoded: null
    };
  }
}
