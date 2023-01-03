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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUserInDatabase = exports.validateUser = void 0;
const prisma_1 = __importDefault(require("../util/prisma"));
const password_1 = require("../util/password");
const lodash_1 = require("lodash");
function validateUser({ phoneNumber, password }) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma_1.default.user.findFirst({
            where: {
                phoneNumber
            }
        });
        if (user == null) {
            return null;
        }
        const isValid = yield (0, password_1.comparePasswords)(password, user.password);
        if (!isValid) {
            return null;
        }
        return (0, lodash_1.omit)(user, 'password');
    });
}
exports.validateUser = validateUser;
function isUserInDatabase(query) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield prisma_1.default.user.findFirst({ where: query });
            if (user == null) {
                return false;
            }
            return true;
        }
        catch (err) {
            throw new Error();
        }
    });
}
exports.isUserInDatabase = isUserInDatabase;
//# sourceMappingURL=user.service.js.map