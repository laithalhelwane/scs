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
exports.getOrdersHandler = exports.createOrderFavoriteHandler = exports.createOrderRateHandler = exports.getOrderHandler = exports.createOrederHandler = exports.getServicesHandler = exports.getOwnersHandler = exports.getClinetLocationHandler = exports.createClinetLocationHandler = exports.updateClientHandler = exports.getClientHandler = exports.createClientHandler = exports.createClientSessionHandler = void 0;
const client_service_1 = require("../service/client.service");
const user_service_1 = require("../service/user.service");
const logger_1 = __importDefault(require("../util/logger"));
function createClientSessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const session = yield (0, client_service_1.createClientSessionService)(req.body, res.locals.ua);
            if (session == null) {
                return res.status(401).json({
                    success: false,
                    error_code: 401,
                    message: 'Worng phoneNumber or password'
                });
            }
            res.status(201).json(session);
            return;
        }
        catch (error) {
            logger_1.default.error(error.message);
            res.status(409).json({});
        }
    });
}
exports.createClientSessionHandler = createClientSessionHandler;
function createClientHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const isInDatabase = yield (0, user_service_1.isUserInDatabase)({ phoneNumber: req.body.phoneNumber });
            if (isInDatabase) {
                return res.status(409).json({
                    error: true,
                    error_message: 'phoneNumber already used'
                });
            }
            const client = yield (0, client_service_1.createClientService)(req.body);
            return res.status(201).json(client);
        }
        catch (error) {
            logger_1.default.error(error.message);
            return res.status(409).json(error.message);
        }
    });
}
exports.createClientHandler = createClientHandler;
function getClientHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const client = yield (0, client_service_1.getClientService)(res.locals.client.userId);
            return res.json(client);
        }
        catch (error) {
            return res.status(409).json(error.message);
        }
    });
}
exports.getClientHandler = getClientHandler;
function updateClientHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const client = yield (0, client_service_1.updateClientService)({ id: res.locals.client.userId }, req.body);
            if (client === null) {
                return res.status(404).json({});
            }
            return res.json(client);
        }
        catch (error) {
            return res.status(409).json(error.message);
        }
    });
}
exports.updateClientHandler = updateClientHandler;
function createClinetLocationHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const location = yield (0, client_service_1.createClientLocationService)(req.body, {
                user_id: res.locals.client.id
            });
            return res.status(201).json(location);
        }
        catch (error) {
            return res.status(409).json(error.message);
        }
    });
}
exports.createClinetLocationHandler = createClinetLocationHandler;
function getClinetLocationHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const location = yield (0, client_service_1.getClinetLocationService)(req.params);
            return location;
        }
        catch (err) {
            return res.status(409).json(err.message);
        }
    });
}
exports.getClinetLocationHandler = getClinetLocationHandler;
function getOwnersHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const owners = yield (0, client_service_1.getOwnersService)({ id: req.body.locationId });
            return res.json(owners);
        }
        catch (err) {
            return res.status(409).json(err.message);
        }
    });
}
exports.getOwnersHandler = getOwnersHandler;
function getServicesHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const services = yield (0, client_service_1.getServicesService)({ ownerUser_id: req.params.id });
            return res.json(services);
        }
        catch (err) {
            return res.status(409).json(err.message);
        }
    });
}
exports.getServicesHandler = getServicesHandler;
function createOrederHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const order = yield (0, client_service_1.createOrderService)({ user_id: res.locals.client.id }, { user_id: req.params.id }, req.body);
            return res.json(order);
        }
        catch (err) {
            return res.status(409).json(err.message);
        }
    });
}
exports.createOrederHandler = createOrederHandler;
function getOrderHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const order = yield (0, client_service_1.getOrderService)({ id: req.params.id });
            return res.json(order);
        }
        catch (err) {
            return res.status(409).json(err.message);
        }
    });
}
exports.getOrderHandler = getOrderHandler;
function createOrderRateHandler(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const rate = yield (0, client_service_1.createOrederRateService)({ user_id: (_a = res.locals.client) === null || _a === void 0 ? void 0 : _a.id }, req.params, req.body);
            return res.status(201).json(rate);
        }
        catch (err) {
            return res.status(409).json(err.message);
        }
    });
}
exports.createOrderRateHandler = createOrderRateHandler;
function createOrderFavoriteHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const favorite = yield (0, client_service_1.createOrderFavoriteService)({
                user_id: res.locals.client.id
            }, { user_id: req.params.id });
            return res.status(201).json(favorite);
        }
        catch (err) {
            return res.status(409).json(err.message);
        }
    });
}
exports.createOrderFavoriteHandler = createOrderFavoriteHandler;
function getOrdersHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orders = yield (0, client_service_1.getOrdersService)({ clientUser_id: res.locals.client.id });
            return res.status(200).json(orders);
        }
        catch (err) {
            return res.status(409).json(err.message);
        }
    });
}
exports.getOrdersHandler = getOrdersHandler;
//# sourceMappingURL=client.controller.js.map