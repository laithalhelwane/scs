"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const delivery_controller_1 = require("../controller/delivery.controller");
const requireDelivery_1 = __importDefault(require("../middleware/requireDelivery"));
const validateResource_1 = __importDefault(require("../middleware/validateResource"));
const delivery_schema_1 = require("../schema/delivery.schema");
const router = express_1.default.Router();
router.post('/delivery', (0, validateResource_1.default)(delivery_schema_1.createDeliverySchema), delivery_controller_1.createDeliveryHandler);
router.post('/auth', (0, validateResource_1.default)(delivery_schema_1.createDeliverySessionSchema), delivery_controller_1.createDeliverySessionHandler);
router.get('/order', requireDelivery_1.default, delivery_controller_1.getPendingOrdersHandler);
router.get('/order/me', requireDelivery_1.default, delivery_controller_1.getDeliveryOrdersHandler);
router.put('/delivery/online', [requireDelivery_1.default, (0, validateResource_1.default)(delivery_schema_1.changeDeliveryOnlineSchema)], delivery_controller_1.changeDeliveryOnlineHandler);
exports.default = router;
//# sourceMappingURL=delivery.router.js.map