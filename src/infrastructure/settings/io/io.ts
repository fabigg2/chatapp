
import { Server } from 'socket.io';

export const socketIo = (app: any) => {
    return new Server(app, {
        cors: {
            origin: process.env.CLIENT,
            // origin: "https://chatapp-fa.herokuapp.com",
            methods: ["GET", "POST"]
        }
    });
}