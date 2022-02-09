import { Server, Socket } from "socket.io";
import { userRepository } from "../repositores/user.repository";
import { socketIo } from "../settings/io/io";
import { verifyToken } from "../utils/token";

export const conectionController = async(socket: Socket) => {
    const id = socket.id;
    const user =  await auth(socket);
    if(!user)
        return

    joinSalaPesonal(socket, user._id).then(async()=>usersConneted(socket))

    socket.on('disconnect', async()=>{
        await leaveSalaPesonal(socket, user._id);
        usersConneted(socket)
    });

}

const auth = async( socket: Socket )=>{
    const token = socket.handshake.headers['x-token'] || '';
    try {
        const {_id}:any  = verifyToken(String(token));
        const user = await userRepository.findOneById(_id);
        return user;
    } catch (error) {;
        exception(socket, 'invalid token')
        socket.disconnect();
    }
}

const joinSalaPesonal = async(socket: Socket, uid: string)=>{
    const {id} = socket;
    try {
        const user = await userRepository.findOneById(uid); 
        if(!user){
            return exception(socket, 'id in token ivalid')
        } 
        socket.join(user._id);
        user.isConnected = true;
        await user.save();
    } catch (error) {
        exception(socket, 'internal server error')
    }
}


const leaveSalaPesonal = async(socket: Socket, uid:string)=>{
    const {id} = socket;
    try {
        const user = await userRepository.findOneById(uid); 
        if(!user){
            return exception(socket, 'id in token ivalid')
        } 
        socket.leave(user._id);
        user.isConnected = false;
        await user.save();
    } catch (error) {
        exception(socket, 'internal server error')
    }
}

const usersConneted = async(socket: Socket)=>{
    try {
        const users = await userRepository.findMany(); 

        if(users){
           socket.emit('frineds-connected', users)
           socket.broadcast.emit('frineds-connected', users)

        } 
    } catch (error) {
        exception(socket, 'internal server error')
    }
}


const exception = (socket: Socket, message: string)=>{
    socket.emit('exception', {msg: message });
}