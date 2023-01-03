import { Prisma } from '@prisma/client';
import { omit, set } from 'lodash';
import { createOwnerInput, createServiceInput, updateOrderStatusInput } from '../schema/owner.schema';
import { signJwt } from '../util/jwt';
import { hash } from '../util/password';
import prisma from '../util/prisma';
import { validateUser } from './user.service';

export async function createOwnerService(input: createOwnerInput['body']) {
  try {
    const hashedPassword = await hash(input.password);
    set(input, 'password', hashedPassword);
    const owner = await prisma.user.create({
      data: {
        password: input.password,
        phoneNumber: input.phoneNumber,
        userName: input.userName,
        location: {
          create: {
            ...input.location
          }
        },
        owner: {
          create: { description: input.description ?? '' }
        }
      },
      include: {
        owner: true,
        location: true
      }
    });
    return omit(owner, 'password');
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function createOwnerSessionService({ phoneNumber, password }: { phoneNumber: string; password: string }) {
  try {
    const user = await validateUser({ password, phoneNumber });
    if (user === null) {
      return null;
    }
    const session = await prisma.session.create({
      data: {
        user: { connect: { id: user.id } }
      }
    });
    const accessToken = await signJwt({ userId: user.id, userType: 'o', session: session.id }, { expiresIn: '1y' });
    return { ...session, accessToken };
  } catch (err: any) {
    throw new Error(err);
  }
}
export async function getOwnerService(query: Prisma.ownerWhereUniqueInput) {
  try {
    const owner = await prisma.owner.findUnique({
      where: query,
      include: {
        services: true,
        user: { select: { activated: true, phoneNumber: true, location: true } }
      }
    });
    return owner;
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function createServiceService(input: createServiceInput['body'], user: Prisma.userWhereUniqueInput) {
  try {
    const service = await prisma.service.create({
      data: {
        name: input.name,
        serviceType: input.serviceType,
        services: {
          createMany: {
            data: [...input.services]
          }
        },
        // TODO put acctual id here
        owner: { connect: { user_id: user.id } }
      },
      include: { services: true }
    });
    return service;
  } catch (err: any) {
    throw new Error(err);
  }
}
export async function deleteServiceService(query: Prisma.serviceWhereUniqueInput) {
  try {
    await prisma.service_variety.deleteMany({ where: { serviceId: query.id } });
    const service = await prisma.service.delete({
      where: query
    });
    return service;
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function updateServiceService(query: Prisma.serviceWhereUniqueInput, update: Prisma.serviceUpdateWithoutServicesInput) {
  try {
    const service = await prisma.service.update({
      where: query,
      data: update
    });
    return service;
  } catch (err: any) {
    throw new Error(err);
  }
}
export async function updateAddtionalServiceService(
  query: Prisma.service_varietyWhereUniqueInput,
  update: Prisma.service_varietyUpdateWithoutServiceInput
) {
  try {
    const serviceVariety = await prisma.service_variety.update({
      where: query,
      data: update
    });
    return serviceVariety;
  } catch (err: any) {
    throw new Error(err);
  }
}
export async function getOrdersService(query: Prisma.orderWhereInput) {
  try {
    const orders = await prisma.order.findMany({
      where: {
        ownerUser_id: query.ownerUser_id
      },
      include: {
        rate: true,
        orderDelivery: true
      }
    });
    return orders;
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function updateOrderStatusService(query: Prisma.orderWhereUniqueInput, update: updateOrderStatusInput['body']) {
  try {
    const order = await prisma.order.update({
      where: query,
      data: {
        orderdStatus: { set: update.orderStatus }
      }
    });
    return order;
  } catch (err: any) {
    throw new Error(err);
  }
}
