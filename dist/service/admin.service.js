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
exports.getOwnersAdminService = exports.updateDeliveryStatusService = exports.getPendingDeliveryService = void 0;
const prisma_1 = __importDefault(require("../util/prisma"));
function getPendingDeliveryService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const delivery = prisma_1.default.delivery.findMany({
                where: {
                    user: { activated: { equals: false } }
                }
            });
            return yield delivery;
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
exports.getPendingDeliveryService = getPendingDeliveryService;
function updateDeliveryStatusService(query, input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const delivery = yield prisma_1.default.delivery.update({
                where: query,
                data: {
                    user: { update: { activated: { set: input.activated } } }
                }
            });
            return delivery;
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
exports.updateDeliveryStatusService = updateDeliveryStatusService;
function getOwnersAdminService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const owners = yield prisma_1.default.owner.findMany({ include: { user: true } });
            // TODO remove password
            return owners;
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
exports.getOwnersAdminService = getOwnersAdminService;
//# sourceMappingURL=admin.service.js.map