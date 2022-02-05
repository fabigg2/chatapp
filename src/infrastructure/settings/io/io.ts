
import { Server } from 'socket.io';

export const socketIo = (app: any) => {
    return new Server(app, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"]
        }
    });
}