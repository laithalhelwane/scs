import { Prisma } from '@prisma/client';
import { updateDeliveryStatusInput } from '../schema/admin.schema';
import prisma from '../util/prisma';

export async function getPendingDeliveryService() {
  try {
    const delivery = prisma.delivery.findMany({
      where: {
        user: { activated: { equals: false } }
      }
    });
    return await delivery;
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function updateDeliveryStatusService(query: Prisma.deliveryWhereUniqueInput, input: updateDeliveryStatusInput['body']) {
  try {
    const delivery = await prisma.delivery.update({
      where: query,
      data: {
        user: { update: { activated: { set: input.activated } } }
      }
    });
    return delivery;
  } catch (err: any) {
    throw new Error(err);
  }
}
export async function getOwnersAdminService() {
  try {
    const owners = await prisma.owner.findMany({ include: { user: true } });
    // TODO remove password
    return owners;
  } catch (err: any) {
    throw new Error(err);
  }
}
