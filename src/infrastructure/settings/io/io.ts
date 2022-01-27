
import {Server} from 'socket.io';
import server from 'http';

export const  socketIo = (app: any)=>{
    return new Server(app);
}