import { IMessage } from "../../domain/interfaces/message.interface";
import Message from "../../domain/models/message.model";
import { CreateMessageDTO } from "../dto/message.dto";

export const messageRepository = {
    create:async (createMessageDTO: CreateMessageDTO) => {
        const message: IMessage = new Message(createMessageDTO);
        return await message.save()
    },
    find:async ({from, to}:any) => {
        const messages: IMessage[] = await Message.find().and([
            {$or: [{to}, {to:from}]},
            {$or: [{from}, {from:to}]}
        ]);
        return messages;
    },
    edit:async (id:string, state:number) => {
        const messages: IMessage = await Message.findByIdAndUpdate(id, {state}, {new: true});
        return messages;
    },
    editMany:async ({from, to}:any) => {
        const messages = await Message.updateMany({},{state:3}, {new: true})
        .and([
            {to: from},
            {from: to}, 
            {$or:[{state:1}, {state:2}]}
        ]).exec();
        return messages;
    },
    delete:async ({id, who}:any) => {
        const message:IMessage = await Message.findById(id);
        
        if(message){
            if(who[0] && !message.deletedTo.includes(who[0])){
                message.deletedTo.push(who[0])
            }
            if(who[1] && !message.deletedTo.includes(who[1])){
                message.deletedTo.push(who[1])
            }
            return await message.save();
        }
    }

}