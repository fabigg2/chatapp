"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const routes_1 = __importDefault(require("./infrastructure/routes/routes"));
const DB_1 = __importDefault(require("./infrastructure/settings/db/DB"));
const swagger_1 = require("./infrastructure/settings/doc/swagger");
const io_1 = require("./infrastructure/settings/io/io");
const socket_1 = require("./infrastructure/socket");
class Server {
    constructor() {
        this.port = process.env.PORT || '8080';
    }
    /**
     * description: start the server
     */
    start(port = this.port) {
        this.serve = http_1.default.createServer(Server.app);
        this.socketIo = (0, io_1.socketIo)(this.serve);
        this.serve.listen(this.port, () => {
            console.log('Server on port ' + port);
        });
        this.middleware();
        this.routes();
        DB_1.default.connect();
    }
    middleware() {
        Server.app.use(express_1.default.urlencoded({ extended: false }));
        Server.app.use(express_1.default.json());
        Server.app.use((0, cors_1.default)());
        Server.app.use('/doc', swagger_1.swaggerServe, swagger_1.swaggerSetup);
        Server.app.use('/', express_1.default.static(path_1.default.join(__dirname, '../public')));
    }
    routes() {
        Server.app.use('/api', routes_1.default);
        Server.app.use('**', (req, res) => res.redirect('/'));
        (0, socket_1.ioConnectionManager)(this.socketIo);
    }
}
Server.app = (0, express_1.default)();
Server.app.use(express_1.default.urlencoded({ extended: false }));
Server.app.use(express_1.default.json());
Server.app.use((0, cors_1.default)());
Server.app.use('/doc', swagger_1.swaggerServe, swagger_1.swaggerSetup);
Server.app.use('/', express_1.default.static(path_1.default.join(__dirname, '../public')));
// Server.app.use('/api', route)
exports.default = Server;
