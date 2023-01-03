import { omit, set } from 'lodash';
import { createClientInput, createClientSessionInput, createOrderInput, createOrderRateInput } from '../schema/client.schema';
import { hash } from '../util/password';
import prisma from '../util/prisma';
import { validateUser } from './user.service';
import { signJwt } from '../util/jwt';
import { Prisma } from '@prisma/client';

export async function createClientSessionService(input: createClientSessionInput['body'], userAgent: string) {
  try {
    const user = await validateUser(input);
    if (user === null) {
      return null;
    }
    const session = await prisma.session.create({
      data: {
        user: { connect: { id: user.id } },
        userAgent
      }
    });
    const accessToken = signJwt({ userId: user.id, userType: 'c', session: session.id }, { expiresIn: '1y' });
    return { ...session, accessToken };
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function createClientService(input: createClientInput['body']) {
  try {
    const hashedPassword = await hash(input.password);
    set(input, 'password', hashedPassword);
    const user = await prisma.user.create({
      data: {
        ...input,
        activated: true,
        client: { create: {} }
      }
    });
    return omit(user, 'password');
  } catch (err: any) {
    throw new Error(err.message);
  }
}
export async function getClientService(id: number) {
  try {
    const client = await prisma.client.findFirst({
      where: {
        user_id: id
      },
      include: {
        user: true,
        favorite: true,
        order: true,
        rate: true
      }
    });
    return omit(client, ['user.password', 'user_id']);
  } catch (err: any) {
    throw new Error(err.message);
  }
}
export async function updateClientService(query: Prisma.userWhereUniqueInput, update: Prisma.userUpdateInput & Prisma.clientUpdateInput) {
  try {
    const client = await prisma.client.update({
      where: { user_id: query.id },
      data: {
        user: { update: { ...update } }
      },
      include: { user: true }
    });
    return client;
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function createClientLocationService(input: Prisma.locationCreateWithoutUserInput, client: Prisma.clientWhereUniqueInput) {
  try {
    const location = await prisma.user.update({
      where: { id: client.user_id },
      data: {
        location: {
          create: {
            ...input
          }
        }
      }
    });
    return location;
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function getClinetLocationService(query: Prisma.locationWhereUniqueInput) {
  try {
    const location = await prisma.location.findUnique({
      where: {
        id: query.id
      }
    });
    return location;
  } catch (err: any) {
    throw new Error(err);
  }
}
export async function getOwnersService(query: Prisma.locationWhereUniqueInput) {
  try {
    // const location = await prisma.location.findUnique({ where: query });
    // if (location == null) {
    //   return null;
    // }
    // TODO Fix query
    const owners = await prisma.owner.findMany({
      include: {
        user: { select: { userName: true, location: true, phoneNumber: true } },
        services: true
      }
    });

    return owners;
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function getServicesService(query: Prisma.serviceWhereInput) {
  try {
    const services = await prisma.service.findMany({
      where: query
    });
    return services;
  } catch (err: any) {
    throw new Error(err);
  }
}
export async function createOrderService(
  client: Prisma.clientWhereUniqueInput,
  owner: Prisma.ownerWhereUniqueInput,
  input: createOrderInput['body']
) {
  try {
    const order = await prisma.order.create({
      data: {
        client: { connect: { user_id: client.user_id } },
        owner: { connect: { user_id: owner.user_id } }
      }
    });
    for (let i = 0; i < input.length; i++) {
      await prisma.order_service.create({
        data: {
          service: { connect: { id: input[i].serviceId } },
          order: { connect: { id: order.id } },
          order_service_detail: {
            createMany: { data: input[i].order_service_detail }
          },
          quantity: input[i].quantity
        }
      });
    }
    return order;
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function getOrderService(query: Prisma.orderWhereUniqueInput) {
  try {
    const order = await prisma.order.findUnique({
      where: query
    });
    return order;
  } catch (err: any) {
    throw new Error(err);
  }
}
export async function createOrederRateService(
  client: Prisma.clientWhereUniqueInput,
  query: Prisma.orderWhereUniqueInput,
  input: createOrderRateInput['body']
) {
  try {
    const rate = await prisma.rate.create({
      data: {
        client: { connect: { user_id: client.user_id } },
        order: { connect: { id: query.id } },
        value: input.value
      }
    });
    return rate;
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function createOrderFavoriteService(client: Prisma.clientWhereUniqueInput, owner: Prisma.ownerWhereUniqueInput) {
  try {
    const favorite = await prisma.favorite.create({
      data: {
        client: { connect: { user_id: client.user_id } },
        owner: { connect: { user_id: owner.user_id } }
      }
    });
    return favorite;
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function getOrdersService(query: Prisma.orderWhereInput) {
  try {
    const orders = await prisma.order.findMany({
      where: { client: { user_id: query.clientUser_id } }
    });
    return orders;
  } catch (err: any) {
    throw new Error(err);
  }
}
