import { Socket } from "socket.io";
import { IUser } from "../../domain/interfaces/user.interface";
import { messageRepository } from "../repositores/message.repositoy";
import { userRepository } from "../repositores/user.repository";
import { verifyToken } from "../utils/token";

export const messageController = async (socket: Socket) => {
    const user = await auth(socket);
    if (!user)
        return

    joinSalaPesonal(socket, user._id).then(async () => usersConneted(socket, user))

    socket.on('new-message', async (data) => {
        data.state = 1;
        try {
            const res = await messageRepository.create(data);
            socket.to(`${data.to}`).emit('new-message', res);
            // socket.emit('message-receive', res);
            socket.emit('new-message-me', res);
        } catch (error) {
            exception(socket, 'internal server error')

        }
    });

    socket.on('message-receive', async (data) => {
        data.state = 2;
        try {
            const res = await messageRepository.edit(data._id, data.state)
            socket.to(`${data.from}`).emit('message-receive', res);

        } catch (error) {

        }
    });


    socket.on('find-all-messages', async (data) => {
        try {
            await messageRepository.editMany(data);
            const messages = await messageRepository.find(data);
            socket.emit('find-all-messages', messages);
            socket.to(data.to).emit('find-all-messages', messages);
        } catch (error) {
            exception(socket, 'internal server error')

        }

    });

    socket.on('delete-message', async (data) => {
        try {
            const res = await messageRepository.delete(data);
            if (res) {
                socket.emit('deleted-message', res);
                socket.to(res.to).emit('deleted-message', res);
            }
        } catch (error) {
            exception(socket, 'internal server error')
        }
    });

    socket.on('writing', async (data) => {
        socket.to(data.to).emit('wrinting', data);
    });
    socket.on('stop-writing', async (data) => {
        socket.to(data.to).emit('stop-wrinting', data);
    });

    socket.on('disconnect', async () => {
        await leaveSalaPesonal(socket, user._id);
        usersConneted(socket, user)
    });
}

const auth = async (socket: Socket) => {
    const token = socket.handshake.headers['x-token'] || '';
    try {
        const { _id }: any = verifyToken(String(token));
        const user = await userRepository.findOneById(_id);
        return user;
    } catch (error) {
        exception(socket, 'invalid token');
        socket.disconnect();
    }
}

const joinSalaPesonal = async (socket: Socket, uid: string) => {

    const { id } = socket;
    try {
        const user = await userRepository.findOneById(uid);
        if (!user) {
            return exception(socket, 'id in token ivalid')
        }
        socket.join(`${user._id}`);
        user.isConnected = true;
        await user.save();
    } catch (error) {
        exception(socket, 'internal server error')
    }
}


const leaveSalaPesonal = async (socket: Socket, uid: string) => {
    const { id } = socket;
    try {
        const user = await userRepository.findOneById(uid);
        if (!user) {
            return exception(socket, 'id in token ivalid')
        }
        socket.leave(user._id);
        user.isConnected = false;
        await user.save();
    } catch (error) {
        exception(socket, 'internal server error')
    }
}

const usersConneted = async (socket: Socket, use: IUser) => {
    const token = socket.handshake.headers['x-token'] || '';
    const { _id }: any = verifyToken(String(token));

    try {
        const users = await userRepository.findMany({ _id: { '$ne': _id } });
        const user = await userRepository.findOneById(_id);
        if (users) {
            socket.emit('frineds-connected', users)
            socket.broadcast.emit('frined-connected', user);
        }
    } catch (error) {
        exception(socket, 'internal server error')
    }
}


const exception = (socket: Socket, message: string) => {
    socket.emit('exception', { msg: message });
}