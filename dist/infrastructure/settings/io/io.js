"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketIo = void 0;
const socket_io_1 = require("socket.io");
const socketIo = (app) => {
    return new socket_io_1.Server(app, {
        cors: {
            // origin: "http://localhost:3000",
            origin: "https://chatapp-fa.herokuapp.com",
            methods: ["GET", "POST"]
        }
    });
};
exports.socketIo = socketIo;
