"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./configs/config"));
const server_1 = __importDefault(require("./util/server"));
const logger_1 = __importDefault(require("./util/logger"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, server_1.default)();
const { app: { port } } = config_1.default;
app.listen(port, () => {
    (0, routes_1.default)(app);
    logger_1.default.info(`check your app http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map