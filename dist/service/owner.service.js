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
exports.updateOrderStatusService = exports.getOrdersService = exports.updateAddtionalServiceService = exports.updateServiceService = exports.deleteServiceService = exports.createServiceService = exports.getOwnerService = exports.createOwnerSessionService = exports.createOwnerService = void 0;
const lodash_1 = require("lodash");
const jwt_1 = require("../util/jwt");
const password_1 = require("../util/password");
const prisma_1 = __importDefault(require("../util/prisma"));
const user_service_1 = require("./user.service");
function createOwnerService(input) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hashedPassword = yield (0, password_1.hash)(input.password);
            (0, lodash_1.set)(input, 'password', hashedPassword);
            const owner = yield prisma_1.default.user.create({
                data: {
                    password: input.password,
                    phoneNumber: input.phoneNumber,
                    userName: input.userName,
                    location: {
                        create: Object.assign({}, input.location)
                    },
                    owner: {
                        create: { description: (_a = input.description) !== null && _a !== void 0 ? _a : '' }
                    }
                },
                include: {
                    owner: true,
                    location: true
                }
            });
            return (0, lodash_1.omit)(owner, 'password');
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
exports.createOwnerService = createOwnerService;
function createOwnerSessionService({ phoneNumber, password }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, user_service_1.validateUser)({ password, phoneNumber });
            if (user === null) {
                return null;
            }
            const session = yield prisma_1.default.session.create({
                data: {
                    user: { connect: { id: user.id } }
                }
            });
            const accessToken = yield (0, jwt_1.signJwt)({ userId: user.id, userType: 'o', session: session.id }, { expiresIn: '1y' });
            return Object.assign(Object.assign({}, session), { accessToken });
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
exports.createOwnerSessionService = createOwnerSessionService;
function getOwnerService(query) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const owner = yield prisma_1.default.owner.findUnique({
                where: query,
                include: {
                    services: true,
                    user: { select: { activated: true, phoneNumber: true, location: true } }
                }
            });
            return owner;
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
exports.getOwnerService = getOwnerService;
function createServiceService(input, user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const service = yield prisma_1.default.service.create({
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
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
exports.createServiceService = createServiceService;
function deleteServiceService(query) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield prisma_1.default.service_variety.deleteMany({ where: { serviceId: query.id } });
            const service = yield prisma_1.default.service.delete({
                where: query
            });
            return service;
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
exports.deleteServiceService = deleteServiceService;
function updateServiceService(query, update) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const service = yield prisma_1.default.service.update({
                where: query,
                data: update
            });
            return service;
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
exports.updateServiceService = updateServiceService;
function updateAddtionalServiceService(query, update) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const serviceVariety = yield prisma_1.default.service_variety.update({
                where: query,
                data: update
            });
            return serviceVariety;
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
exports.updateAddtionalServiceService = updateAddtionalServiceService;
function getOrdersService(query) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orders = yield prisma_1.default.order.findMany({
                where: {
                    ownerUser_id: query.ownerUser_id
                },
                include: {
                    rate: true,
                    orderDelivery: true
                }
            });
            return orders;
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
exports.getOrdersService = getOrdersService;
function updateOrderStatusService(query, update) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const order = yield prisma_1.default.order.update({
                where: query,
                data: {
                    orderdStatus: { set: update.orderStatus }
                }
            });
            return order;
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
exports.updateOrderStatusService = updateOrderStatusService;
//# sourceMappingURL=owner.service.js.map