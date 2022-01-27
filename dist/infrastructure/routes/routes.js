"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("./auth.routes");
const user_routes_1 = require("./user.routes");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const router = (0, express_1.default)();
router.use((0, express_fileupload_1.default)({
    useTempFiles: true
}));
router.use('/user', user_routes_1.userRoutes);
router.use('/auth', auth_routes_1.authRoutes);
exports.default = router;
