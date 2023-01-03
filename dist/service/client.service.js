"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdersService = exports.createOrderFavoriteService = exports.createOrederRateService = exports.getOrderService = exports.createOrderService = exports.getServicesService = exports.getOwnersService = exports.getClinetLocationService = exports.createClientLocationService = exports.updateClientService = exports.getClientService = exports.createClientService = exports.createClientSessionService = void 0;
const lodash_1 = require("lodash");
const password_1 = require("../util/password");
const prisma_1 = __importDefault(require("../util/prisma"));
const user_service_1 = require("./user.service");
const jwt_1 = require("../util/jwt");
function createClientSessionService(input, userAgent) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, user_service_1.validateUser)(input);
            if (user === null) {
                return null;
            }
            const session = yield prisma_1.default.session.create({
                data: {
                    user: { connect: { id: user.id } },
                    userAgent
                }
            });
            const accessToken = (0, jwt_1.signJwt)({ userId: user.id, userType: 'c', session: session.id }, { expiresIn: '1y' });
            return Object.assign(Object.assign({}, session), { accessToken });
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
exports.createClientSessionService = createClientSessionService;
function createClientService(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hashedPassword = yield (0, password_1.hash)(input.password);
            (0, lodash_1.set)(input, 'password', hashedPassword);
            const user = yield prisma_1.default.user.create({
                data: Object.assign(Object.assign({}, input), { activated: true, client: { create: {} } })
            });
            return (0, lodash_1.omit)(user, 'password');
        }
        catch (err) {
            throw new Error(err.message);
        }
    });
}
exports.createClientService = createClientService;
function getClientService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const client = yield prisma_1.default.client.findFirst({
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
            return (0, lodash_1.omit)(client, ['user.password', 'user_id']);
        }
        catch (err) {
            throw new Error(err.message);
        }
    });
}
exports.getClientService = getClientService;
function updateClientService(query, update) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const client = yield prisma_1.default.client.update({
                where: { user_id: query.id },
                data: {
                    user: { update: Object.assign({}, update) }
                },
                include: { user: true }
            });
            return client;
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
exports.updateClientService = updateClientService;
function createClientLocationService(input, client) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const location = yield prisma_1.default.user.update({
                where: { id: client.user_id },
                data: {
                    location: {
                        create: Object.assign({}, input)
                    }
                }
            });
            return location;
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
exports.createClientLocationService = createClientLocationService;
function getClinetLocationService(query) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const location = yield prisma_1.default.location.findUnique({
                where: {
                    id: query.id
                }
            });
            return location;
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
exports.getClinetLocationService = getClinetLocationService;
function getOwnersService(query) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const location = await prisma.location.findUnique({ where: query });
            // if (location == null) {
            //   return null;
            // }
            // TODO Fix query
            const owners = yield prisma_1.default.owner.findMany({
                include: {
                    user: { select: { userName: true, location: true, phoneNumber: true } },
                    services: true
                }
            });
            return owners;
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
exports.getOwnersService = getOwnersService;
function getServicesService(query) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const services = yield prisma_1.default.service.findMany({
                where: query
            });
            return services;
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
exports.getServicesService = getServicesService;
function createOrderService(client, owner, input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const order = yield prisma_1.default.order.create({
                data: {
                    client: { connect: { user_id: client.user_id } },
                    owner: { connect: { user_id: owner.user_id } }
                }
            });
            for (let i = 0; i < input.length; i++) {
                yield prisma_1.default.order_service.create({
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
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
exports.createOrderService = createOrderService;
function getOrderService(query) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const order = yield prisma_1.default.order.findUnique({
                where: query
            });
            return order;
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
exports.getOrderService = getOrderService;
function createOrederRateService(client, query, input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const rate = yield prisma_1.default.rate.create({
                data: {
                    client: { connect: { user_id: client.user_id } },
                    order: { connect: { id: query.id } },
                    value: input.value
                }
            });
            return rate;
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
exports.createOrederRateService = createOrederRateService;
function createOrderFavoriteService(client, owner) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const favorite = yield prisma_1.default.favorite.create({
                data: {
                    client: { connect: { user_id: client.user_id } },
                    owner: { connect: { user_id: owner.user_id } }
                }
            });
            return favorite;
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
exports.createOrderFavoriteService = createOrderFavoriteService;
function getOrdersService(query) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orders = yield prisma_1.default.order.findMany({
                where: { client: { user_id: query.clientUser_id } }
            });
            return orders;
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
exports.getOrdersService = getOrdersService;
//# sourceMappingURL=client.service.js.map