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
exports.messageController = void 0;
const user_repository_1 = require("../repositores/user.repository");
const token_1 = require("../utils/token");
const messageController = (socket) => __awaiter(void 0, void 0, void 0, function* () {
    const id = socket.id;
    const user = yield auth(socket);
    if (!user)
        return;
    joinSalaPesonal(socket, user._id).then(() => __awaiter(void 0, void 0, void 0, function* () { return usersConneted(socket); }));
    socket.on('new-message', ({ uid, msg }) => {
        socket.to(uid).emit('new-message', { msg, uid });
    });
    socket.on('disconnect', () => __awaiter(void 0, void 0, void 0, function* () {
        yield leaveSalaPesonal(socket, user._id);
        usersConneted(socket);
    }));
});
exports.messageController = messageController;
const auth = (socket) => __awaiter(void 0, void 0, void 0, function* () {
    const token = socket.handshake.headers['x-token'] || '';
    try {
        const { _id } = (0, token_1.verifyToken)(String(token));
        const user = yield user_repository_1.userRepository.findOneById(_id);
        return user;
    }
    catch (error) {
        ;
        exception(socket, 'invalid token');
        socket.disconnect();
    }
});
const joinSalaPesonal = (socket, uid) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = socket;
    try {
        const user = yield user_repository_1.userRepository.findOneById(uid);
        if (!user) {
            return exception(socket, 'id in token ivalid');
        }
        socket.join(user._id);
        user.isConnected = true;
        yield user.save();
    }
    catch (error) {
        exception(socket, 'internal server error');
    }
});
const leaveSalaPesonal = (socket, uid) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = socket;
    try {
        const user = yield user_repository_1.userRepository.findOneById(uid);
        if (!user) {
            return exception(socket, 'id in token ivalid');
        }
        socket.leave(user._id);
        user.isConnected = false;
        yield user.save();
    }
    catch (error) {
        exception(socket, 'internal server error');
    }
});
const usersConneted = (socket) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_repository_1.userRepository.findMany();
        if (users) {
            socket.emit('frineds-connected', users);
            socket.broadcast.emit('frineds-connected', users);
        }
    }
    catch (error) {
        exception(socket, 'internal server error');
    }
});
const exception = (socket, message) => {
    socket.emit('exception', { msg: message });
};
