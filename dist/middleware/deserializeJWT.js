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
exports.deserializeUser = void 0;
const lodash_1 = require("lodash");
const jwt_1 = require("../util/jwt");
const deserializeUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = (0, lodash_1.get)(req, 'headers.authorization', '').replace(/^Bearer\s/, '');
    if (accessToken.length === 0) {
        return next();
    }
    const { expired, decoded } = (0, jwt_1.verifyJwt)(accessToken);
    if (decoded != null && !expired) {
        if (decoded.userType === 'c') {
            res.locals.client = decoded;
        }
        else if (decoded.userType === 'a') {
            res.locals.admin = decoded;
        }
        else if (decoded.userType === 'd') {
            res.locals.delivery = decoded;
        }
        else if (decoded.userType === 'o') {
            res.locals.owner = decoded;
        }
        return next();
    }
    return next();
});
exports.deserializeUser = deserializeUser;
//# sourceMappingURL=deserializeJWT.js.map