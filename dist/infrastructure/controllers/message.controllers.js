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
const message_repositoy_1 = require("../repositores/message.repositoy");
const user_repository_1 = require("../repositores/user.repository");
const token_1 = require("../utils/token");
const messageController = (socket) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth(socket);
    if (!user)
        return;
    joinSalaPesonal(socket, user._id).then(() => __awaiter(void 0, void 0, void 0, function* () { return usersConneted(socket, user); }));
    socket.on('new-message', (data) => __awaiter(void 0, void 0, void 0, function* () {
        data.state = 1;
        try {
            const res = yield message_repositoy_1.messageRepository.create(data);
            socket.to(`${data.to}`).emit('new-message', res);
            // socket.emit('message-receive', res);
            socket.emit('new-message-me', res);
        }
        catch (error) {
            exception(socket, 'internal server error');
        }
    }));
    socket.on('message-receive', (data) => __awaiter(void 0, void 0, void 0, function* () {
        data.state = 2;
        try {
            const res = yield message_repositoy_1.messageRepository.edit(data._id, data.state);
            socket.to(`${data.from}`).emit('message-receive', res);
        }
        catch (error) {
        }
    }));
    // socket.on('unsight-message', async(data) => {
    //     data.state = 2;
    //     try {
    //         const res = await messageRepository.edit(data._id, data.state)
    //         socket.to(`${data.from}`).emit('message-receive', res);
    //     } catch (error) {
    //     }
    // });
    socket.on('find-all-messages', (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield message_repositoy_1.messageRepository.editMany(data);
            const messages = yield message_repositoy_1.messageRepository.find(data);
            socket.emit('find-all-messages', messages);
            socket.to(data.to).emit('find-all-messages', messages);
        }
        catch (error) {
            exception(socket, 'internal server error');
        }
    }));
    socket.on('disconnect', () => __awaiter(void 0, void 0, void 0, function* () {
        yield leaveSalaPesonal(socket, user._id);
        usersConneted(socket, user);
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
        socket.join(`${user._id}`);
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
const usersConneted = (socket, use) => __awaiter(void 0, void 0, void 0, function* () {
    const token = socket.handshake.headers['x-token'] || '';
    const { _id } = (0, token_1.verifyToken)(String(token));
    // console.log('\n\n\n' + token);
    try {
        const users = yield user_repository_1.userRepository.findMany({ _id: { '$ne': _id } });
        const user = yield user_repository_1.userRepository.findOneById(_id);
        if (users) {
            socket.emit('frineds-connected', users);
            socket.broadcast.emit('frined-connected', user);
        }
    }
    catch (error) {
        exception(socket, 'internal server error');
    }
});
const exception = (socket, message) => {
    socket.emit('exception', { msg: message });
};
