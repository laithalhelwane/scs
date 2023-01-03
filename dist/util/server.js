"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const deserializeJWT_1 = require("../middleware/deserializeJWT");
const getUserAgent_1 = __importDefault(require("../middleware/getUserAgent"));
function createServer() {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({
        origin: '*',
        methods: 'GET,PATCH,POST,DELETE'
    }));
    app.use(express_1.default.json());
    app.use(deserializeJWT_1.deserializeUser);
    app.use(getUserAgent_1.default);
    return app;
}
exports.default = createServer;
//# sourceMappingURL=server.js.map