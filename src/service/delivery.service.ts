import { Prisma } from '@prisma/client';
import { set } from 'lodash';
import { changeDeliveryOnlineInput, createDeliveryInput, createDeliverySessionInput } from '../schema/delivery.schema';
import { signJwt } from '../util/jwt';
import { hash } from '../util/password';
import prisma from '../util/prisma';
import { validateUser } from './user.service';

export async function createDeliveryService(input: createDeliveryInput['body']) {
  try {
    const hashedPassword = await hash(input.password);
    set(input, 'password', hashedPassword);
    const delivery = await prisma.delivery.create({
      data: {
        user: {
          create: {
            password: input.password,
            userName: input.userName,
            phoneNumber: input.phoneNumber
          }
        },
        nationality: input.nationality,
        relativePhNumber: input.relativePhNumber,
        relativeType: input.relativeType,
        residentLocation: input.residentLocation,
        vehicleColor: input.vehicleColor,
        vehicleNumber: input.vehicleNumber,
        vehicleType: input.vehicleType
      }
    });
    return delivery;
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function createDeliverSessionService(input: createDeliverySessionInput['body']) {
  try {
    const user = await validateUser(input);
    if (user === null) {
      return null;
    }
    const session = await prisma.session.create({
      data: {
        user: { connect: { id: user.id } }
      }
    });
    const accessToken = signJwt({ userId: user.id, userType: 'd', session: session.id }, { expiresIn: '1y' });
    return { ...session, accessToken };
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function getPendingOrdersService() {
  try {
    const orders = await prisma.order.findMany({
      where: {
        orderdStatus: 'wating'
      }
    });
    return orders;
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function getDeliveryOrdersService(query: Prisma.deliveryWhereUniqueInput) {
  try {
    const orders = await prisma.order.findMany({
      where: {
        orderDelivery: {
          some: { deliveryUserId: query.userId }
        }
      }
    });
    return orders;
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function changeDeliveryOnlineService(query: Prisma.deliveryWhereUniqueInput, update: changeDeliveryOnlineInput['body']) {
  try {
    const delivery = await prisma.delivery.update({ where: query, data: { online: update.online===1 } });
    return delivery;
  } catch (err: any) {
    throw new Error(err);
  }
}
