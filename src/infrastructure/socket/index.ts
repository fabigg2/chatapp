import { Server, Socket } from "socket.io";
import { messageController } from "../controllers/message.controllers";
import { verifyToken } from "../utils/token";

export const ioConnectionManager = (socketIO: Server) => {
    socketIO.on('connection', (socket: Socket) => {
        console.log('new user connected');
        messageController(socket);
    })
}