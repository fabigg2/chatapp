
import { Server } from 'socket.io';

export const socketIo = (app: any) => {
    return new Server(app, {
        cors: {
            origin: '*',
            // origin: "https://chatapp-fa.herokuapp.com",
            methods: ["GET", "POST"]
        }
    });
}