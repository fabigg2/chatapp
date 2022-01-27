"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketIo = void 0;
const socket_io_1 = require("socket.io");
const socketIo = (app) => {
    return new socket_io_1.Server(app);
};
exports.socketIo = socketIo;
