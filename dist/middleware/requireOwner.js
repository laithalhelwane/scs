"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requireClient = (req, res, next) => {
    const { owner } = res.locals;
    if (owner === undefined) {
        return res.status(403).json({ success: false, error_code: 403, message: 'Not Authorized' });
    }
    return next();
};
exports.default = requireClient;
//# sourceMappingURL=requireOwner.js.map