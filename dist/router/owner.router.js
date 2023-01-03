"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateResource_1 = __importDefault(require("../middleware/validateResource"));
const owner_schema_1 = require("../schema/owner.schema");
const owner_controller_1 = require("../controller/owner.controller");
const requireOwner_1 = __importDefault(require("../middleware/requireOwner"));
const router = express_1.default.Router();
router.post('/owner', (0, validateResource_1.default)(owner_schema_1.createOwnerSchema), owner_controller_1.createOwnerHandler);
router.post('/auth', (0, validateResource_1.default)(owner_schema_1.createOnwerSessionSchema), owner_controller_1.createOwnerSessionHandler);
router.get('/owner', requireOwner_1.default, owner_controller_1.getOwnerHandler);
router.post('/service', requireOwner_1.default, (0, validateResource_1.default)(owner_schema_1.createServiceSchema), owner_controller_1.createServiceHandler);
router.delete('/service/:id', requireOwner_1.default, (0, validateResource_1.default)(owner_schema_1.deleteServiceSchema), owner_controller_1.deleteServiceHandler);
router.put('/service/:id', requireOwner_1.default, (0, validateResource_1.default)(owner_schema_1.updateServiceSchema), owner_controller_1.updateServiceHandler);
router.get('/order', requireOwner_1.default, owner_controller_1.getOrdersHandler);
// TODO: test me
router.put('/order/:id', [requireOwner_1.default, (0, validateResource_1.default)(owner_schema_1.updateOrderStatusSchema)], owner_controller_1.updateOrderStatusHandler);
// TODO: Fix Me
// router.put('/service/:id/aservice/:a_id', validate(updateAddtionalServiceSchema), updateAddtionalServiceHandler);
exports.default = router;
//# sourceMappingURL=owner.router.js.map