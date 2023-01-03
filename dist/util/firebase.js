"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const cleaning_service_b75e9_firebase_adminsdk_53gvg_a42ae6271b_json_1 = __importDefault(require("../cleaning-service-b75e9-firebase-adminsdk-53gvg-a42ae6271b.json"));
// const serviceAccount = require("path/to/serviceAccountKey.json");
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(cleaning_service_b75e9_firebase_adminsdk_53gvg_a42ae6271b_json_1.default)
});
exports.default = firebase_admin_1.default;
//# sourceMappingURL=firebase.js.map