"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requireClient = (req, res, next) => {
    const { delivery } = res.locals;
    if (delivery === undefined) {
        return res.status(403).json({ success: false, error_code: 403, message: 'Not Authorized' });
    }
    return next();
};
exports.default = requireClient;
//# sourceMappingURL=requireDelivery.js.map