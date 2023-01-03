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
exports.changeDeliveryOnlineService = exports.getDeliveryOrdersService = exports.getPendingOrdersService = exports.createDeliverSessionService = exports.createDeliveryService = void 0;
const lodash_1 = require("lodash");
const jwt_1 = require("../util/jwt");
const password_1 = require("../util/password");
const prisma_1 = __importDefault(require("../util/prisma"));
const user_service_1 = require("./user.service");
function createDeliveryService(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hashedPassword = yield (0, password_1.hash)(input.password);
            (0, lodash_1.set)(input, 'password', hashedPassword);
            const delivery = yield prisma_1.default.delivery.create({
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
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
exports.createDeliveryService = createDeliveryService;
function createDeliverSessionService(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, user_service_1.validateUser)(input);
            if (user === null) {
                return null;
            }
            const session = yield prisma_1.default.session.create({
                data: {
                    user: { connect: { id: user.id } }
                }
            });
            const accessToken = (0, jwt_1.signJwt)({ userId: user.id, userType: 'd', session: session.id }, { expiresIn: '1y' });
            return Object.assign(Object.assign({}, session), { accessToken });
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
exports.createDeliverSessionService = createDeliverSessionService;
function getPendingOrdersService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orders = yield prisma_1.default.order.findMany({
                where: {
                    orderdStatus: 'wating'
                }
            });
            return orders;
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
exports.getPendingOrdersService = getPendingOrdersService;
function getDeliveryOrdersService(query) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orders = yield prisma_1.default.order.findMany({
                where: {
                    orderDelivery: {
                        some: { deliveryUserId: query.userId }
                    }
                }
            });
            return orders;
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
exports.getDeliveryOrdersService = getDeliveryOrdersService;
function changeDeliveryOnlineService(query, update) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const delivery = yield prisma_1.default.delivery.update({ where: query, data: { online: update.online === 1 } });
            return delivery;
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
exports.changeDeliveryOnlineService = changeDeliveryOnlineService;
//# sourceMappingURL=delivery.service.js.map