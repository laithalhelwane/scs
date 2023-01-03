import config from '../configs/config';
import bcrypt from 'bcrypt';
const {
  jwt: { saltWorkFactor }
} = config;
export async function hash(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(saltWorkFactor);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}
export async function comparePasswords(candidatePassword: string, password: string) {
  return await bcrypt.compare(candidatePassword, password).catch(() => false);
}
