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
exports.updateOrderStatusHandler = exports.getOrdersHandler = exports.updateAddtionalServiceHandler = exports.updateServiceHandler = exports.deleteServiceHandler = exports.createServiceHandler = exports.getOwnerHandler = exports.createOwnerSessionHandler = exports.createOwnerHandler = void 0;
const owner_service_1 = require("../service/owner.service");
function createOwnerHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const owner = yield (0, owner_service_1.createOwnerService)(req.body);
            return res.status(201).json(owner);
        }
        catch (err) {
            return res.status(409).json(err.message);
        }
    });
}
exports.createOwnerHandler = createOwnerHandler;
function createOwnerSessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const session = yield (0, owner_service_1.createOwnerSessionService)(req.body);
            return res.status(201).json(session);
        }
        catch (err) {
            return res.status(409).json(err.message);
        }
    });
}
exports.createOwnerSessionHandler = createOwnerSessionHandler;
function getOwnerHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const owner = yield (0, owner_service_1.getOwnerService)({ user_id: res.locals.owner.userId });
            return res.json(owner);
        }
        catch (err) {
            return res.status(409).json(err.message);
        }
    });
}
exports.getOwnerHandler = getOwnerHandler;
function createServiceHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const service = yield (0, owner_service_1.createServiceService)(req.body, { id: res.locals.owner.userId });
            return res.status(201).json(service);
        }
        catch (err) {
            return res.status(409).json(err.message);
        }
    });
}
exports.createServiceHandler = createServiceHandler;
function deleteServiceHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const service = yield (0, owner_service_1.deleteServiceService)({ id: +req.params.id });
            return res.status(200).json(service);
        }
        catch (err) {
            return res.status(409).json(err.message);
        }
    });
}
exports.deleteServiceHandler = deleteServiceHandler;
function updateServiceHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const serivce = yield (0, owner_service_1.updateServiceService)({ id: +req.params.id }, req.body);
            return res.status(200).json(serivce);
        }
        catch (err) {
            return res.status(409).json(err.message);
        }
    });
}
exports.updateServiceHandler = updateServiceHandler;
function updateAddtionalServiceHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // TODO Fix me please baby
            const addtionalSerivce = yield (0, owner_service_1.updateAddtionalServiceService)({
                id: +req.params.id
            }, req.body);
            return res.status(200).json(addtionalSerivce);
        }
        catch (err) {
            return res.status(409).json(err.message);
        }
    });
}
exports.updateAddtionalServiceHandler = updateAddtionalServiceHandler;
function getOrdersHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orders = yield (0, owner_service_1.getOrdersService)({ clientUser_id: res.locals.owner.userId });
            return res.json(orders);
        }
        catch (err) {
            return res.status(409).json(err.message);
        }
    });
}
exports.getOrdersHandler = getOrdersHandler;
function updateOrderStatusHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const order = yield (0, owner_service_1.updateOrderStatusService)({ id: +req.params.id }, { orderStatus: req.body.orderStatus });
            return res.json(order);
        }
        catch (err) {
            return res.status(409).json(err.message);
        }
    });
}
exports.updateOrderStatusHandler = updateOrderStatusHandler;
//# sourceMappingURL=owner.controller.js.map