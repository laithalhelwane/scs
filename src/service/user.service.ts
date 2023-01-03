import prisma from '../util/prisma';
import { comparePasswords } from '../util/password';
import { omit } from 'lodash';
import { Prisma } from '@prisma/client';
export async function validateUser({ phoneNumber, password }: { phoneNumber: string; password: string }) {
  const user = await prisma.user.findFirst({
    where: {
      phoneNumber
    }
  });
  if (user == null) {
    return null;
  }
  const isValid = await comparePasswords(password, user.password);
  if (!isValid) {
    return null;
  }
  return omit(user, 'password');
}
export async function isUserInDatabase(query: Prisma.userWhereUniqueInput) {
  try {
    const user = await prisma.user.findFirst({ where: query });
    if (user == null) {
      return false;
    }
    return true;
  } catch (err: any) {
    throw new Error();
  }
}
