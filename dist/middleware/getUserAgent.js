"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getUserAgent(req, res, next) {
    var _a;
    res.locals.ua = (_a = req.get('User-Agent')) !== null && _a !== void 0 ? _a : '';
    next();
}
exports.default = getUserAgent;
//# sourceMappingURL=getUserAgent.js.map