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
exports.getOwnersAdminHandler = exports.updateDeliveryStatusHandler = exports.getPendingDeliveryHandler = void 0;
const admin_service_1 = require("../service/admin.service");
function getPendingDeliveryHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const delivery = yield (0, admin_service_1.getPendingDeliveryService)();
            return res.json(delivery);
        }
        catch (err) {
            return res.status(409).json(err.message);
        }
    });
}
exports.getPendingDeliveryHandler = getPendingDeliveryHandler;
function updateDeliveryStatusHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const delivery = yield (0, admin_service_1.updateDeliveryStatusService)({ userId: req.params.id }, req.body);
            return res.json(delivery);
        }
        catch (err) {
            return res.status(409).json(err.message);
        }
    });
}
exports.updateDeliveryStatusHandler = updateDeliveryStatusHandler;
function getOwnersAdminHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const owner = yield (0, admin_service_1.getOwnersAdminService)();
            return res.json(owner);
        }
        catch (err) { }
    });
}
exports.getOwnersAdminHandler = getOwnersAdminHandler;
//# sourceMappingURL=admin.controller.js.map