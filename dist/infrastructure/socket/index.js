"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ioConnectionManager = void 0;
const message_controllers_1 = require("../controllers/message.controllers");
const ioConnectionManager = (socketIO) => {
    socketIO.on('connection', (socket) => {
        console.log('new user connected');
        (0, message_controllers_1.messageController)(socket);
    });
};
exports.ioConnectionManager = ioConnectionManager;
