"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSetup = exports.swaggerServe = void 0;
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const openapiSpecification = (0, swagger_jsdoc_1.default)({
    definition: {
        openapi: '3.0.0',
        info: {
            version: '1.0',
            title: 'T-market',
        },
        servers: [{ url: 'http://localhost:5000/api' }]
    },
    apis: ['./src/infrastructure/routes/*.ts', './src/domain/models/*.ts'] // files containing annotations as above
});
exports.swaggerServe = swagger_ui_express_1.default.serve;
exports.swaggerSetup = swagger_ui_express_1.default.setup(openapiSpecification);
