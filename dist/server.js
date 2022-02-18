"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
// import path from 'path'
const routes_1 = __importDefault(require("./infrastructure/routes/routes"));
const DB_1 = __importDefault(require("./infrastructure/settings/db/DB"));
const swagger_1 = require("./infrastructure/settings/doc/swagger");
const io_1 = require("./infrastructure/settings/io/io");
const socket_1 = require("./infrastructure/socket");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8080';
    }
    /**
     * description: start the server
     */
    start(port = this.port) {
        this.serve = http_1.default.createServer(this.app);
        this.socketIo = (0, io_1.socketIo)(this.serve);
        this.serve.listen(this.port, () => {
            console.log('Server on port ' + port);
        });
        this.middleware();
        this.routes();
        DB_1.default.connect();
    }
    middleware() {
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
        this.app.use('/doc', swagger_1.swaggerServe, swagger_1.swaggerSetup);
        this.app.get('/', (req, res) => res.redirect('https://chatapp-fa-v1.herokuapp.com'));
    }
    routes() {
        this.app.use('/api', routes_1.default);
        this.app.get('**', (req, res) => res.json({ ok: false, msg: "page no found" }));
        (0, socket_1.ioConnectionManager)(this.socketIo);
    }
}
// this.app.use(express.urlencoded({ extended: false }))
// this.app.use(express.json())
// this.app.use(cors())
// this.app.use('/doc', swaggerServe, swaggerSetup);
// this.app.use('/', express.static(path.join(__dirname, '../public')));
// this.app.use('/api', route)
exports.default = Server;
