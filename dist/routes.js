"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const client_router_1 = __importDefault(require("./router/client.router"));
const owner_router_1 = __importDefault(require("./router/owner.router"));
const delivery_router_1 = __importDefault(require("./router/delivery.router"));
const admin_router_1 = __importDefault(require("./router/admin.router"));
const swagger_json_1 = __importDefault(require("../swagger.json"));
function routes(app) {
    app.use('/c', client_router_1.default);
    app.use('/o', owner_router_1.default);
    app.use('/d', delivery_router_1.default);
    app.use('/a', admin_router_1.default);
    app.use('/api-doc', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
}
exports.default = routes;
//# sourceMappingURL=routes.js.map