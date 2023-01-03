"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requireClient = (req, res, next) => {
    const { client } = res.locals;
    if (client === undefined) {
        return res.status(403).json({ success: false, error_code: 403, message: 'Not Authorized' });
    }
    return next();
};
exports.default = requireClient;
//# sourceMappingURL=requireClient.js.map