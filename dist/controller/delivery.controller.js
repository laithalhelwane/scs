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
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeDeliveryOnlineHandler = exports.getDeliveryOrdersHandler = exports.getPendingOrdersHandler = exports.createDeliverySessionHandler = exports.createDeliveryHandler = void 0;
const delivery_service_1 = require("../service/delivery.service");
function createDeliveryHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const delivery = yield (0, delivery_service_1.createDeliveryService)(req.body);
            return res.status(201).json(delivery);
        }
        catch (err) {
            return res.status(409).json(err.message);
        }
    });
}
exports.createDeliveryHandler = createDeliveryHandler;
function createDeliverySessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const session = yield (0, delivery_service_1.createDeliverSessionService)(req.body);
            if (session == null) {
                return res.status(401).json({
                    success: false,
                    error_code: 401,
                    message: 'Worng phoneNumber or password'
                });
            }
            return res.status(201).json(session);
        }
        catch (err) {
            return res.status(409).json(err.message);
        }
    });
}
exports.createDeliverySessionHandler = createDeliverySessionHandler;
function getPendingOrdersHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orders = yield (0, delivery_service_1.getPendingOrdersService)();
            return res.json(orders);
        }
        catch (err) {
            return res.status(409).json(err.message);
        }
    });
}
exports.getPendingOrdersHandler = getPendingOrdersHandler;
function getDeliveryOrdersHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orders = yield (0, delivery_service_1.getDeliveryOrdersService)({ userId: res.locals.delivery.id });
            return res.json(orders);
        }
        catch (err) {
            return res.status(409).json(err.message);
        }
    });
}
exports.getDeliveryOrdersHandler = getDeliveryOrdersHandler;
function changeDeliveryOnlineHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const delivery = yield (0, delivery_service_1.changeDeliveryOnlineService)({ userId: res.locals.delivery.userId }, req.body);
            return res.json(delivery);
        }
        catch (err) {
            return res.status(409).json(err.message);
        }
    });
}
exports.changeDeliveryOnlineHandler = changeDeliveryOnlineHandler;
//# sourceMappingURL=delivery.controller.js.map