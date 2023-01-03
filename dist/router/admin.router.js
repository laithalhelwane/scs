"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("../controller/admin.controller");
const requireAdmin_1 = __importDefault(require("../middleware/requireAdmin"));
const validateResource_1 = __importDefault(require("../middleware/validateResource"));
const admin_schema_1 = require("../schema/admin.schema");
const router = express_1.default.Router();
router.get('/delivery', requireAdmin_1.default, admin_controller_1.getPendingDeliveryHandler);
router.put('/delivery/:id', [requireAdmin_1.default, (0, validateResource_1.default)(admin_schema_1.updateDeliveryStatusSchema)], admin_controller_1.updateDeliveryStatusHandler);
router.get('/owner', requireAdmin_1.default, admin_controller_1.getOwnersAdminHandler);
exports.default = router;
//# sourceMappingURL=admin.router.js.map