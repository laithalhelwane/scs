"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDeliveryStatusSchema = void 0;
const zod_1 = require("zod");
exports.updateDeliveryStatusSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.number)()
    }),
    body: (0, zod_1.object)({
        activated: (0, zod_1.boolean)()
    })
});
//# sourceMappingURL=admin.schema.js.map