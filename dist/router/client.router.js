"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_controller_1 = require("../controller/client.controller");
const requireClient_1 = __importDefault(require("../middleware/requireClient"));
const validateResource_1 = __importDefault(require("../middleware/validateResource"));
const client_schema_1 = require("../schema/client.schema");
const router = express_1.default.Router();
router.post('/client', (0, validateResource_1.default)(client_schema_1.createClientSchema), client_controller_1.createClientHandler);
router.post('/auth', (0, validateResource_1.default)(client_schema_1.createClientSessionSchema), client_controller_1.createClientSessionHandler);
// router.post('/auth', requireClient, deleteClientSessionHandler)
router.get('/client', requireClient_1.default, client_controller_1.getClientHandler);
router.put('/client', [requireClient_1.default, (0, validateResource_1.default)(client_schema_1.updateClientSchema)], client_controller_1.updateClientHandler);
router.post('/location', [requireClient_1.default, (0, validateResource_1.default)(client_schema_1.createClientLocationSchema)], client_controller_1.createClinetLocationHandler);
router.get('/location/:id', [requireClient_1.default, (0, validateResource_1.default)(client_schema_1.getClientLocationSchema)], client_controller_1.getClinetLocationHandler);
// TODO Fix getOwnersQuery
router.get('/owner', [requireClient_1.default], client_controller_1.getOwnersHandler);
router.get('/owner/:id/service', [requireClient_1.default, (0, validateResource_1.default)(client_schema_1.getServicesSchema)], client_controller_1.getServicesHandler);
router.post('/order', [requireClient_1.default, (0, validateResource_1.default)(client_schema_1.createOrderSchema)], client_controller_1.createOrederHandler);
router.get('/order/:id', [requireClient_1.default, (0, validateResource_1.default)(client_schema_1.getOrderSchema)], client_controller_1.getOrderHandler);
router.post('/order/:id/rate', [requireClient_1.default, (0, validateResource_1.default)(client_schema_1.createOrderRateSchema)], client_controller_1.createOrderRateHandler);
router.post('/owner/:id/favorite', [requireClient_1.default, (0, validateResource_1.default)(client_schema_1.createOrderFavoriteSchema)], client_controller_1.createOrderFavoriteHandler);
router.get('/order', requireClient_1.default, client_controller_1.getOrdersHandler);
exports.default = router;
//# sourceMappingURL=client.router.js.map