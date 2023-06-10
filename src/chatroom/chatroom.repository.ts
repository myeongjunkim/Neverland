import { Repository } from "typeorm";
import { CustomRepository } from "src/db/typeorm-ex.decorator";
import { ChatRoom, Message } from "./chatroom.entity";
import { Account } from "src/account/account.entity";
import { CreateChatRoomDto } from "./chatroom.dto";

@CustomRepository(ChatRoom)
export class ChatRoomRepository extends Repository<ChatRoom> {

    async createChatRoom(account: Account, createChatRoomDto: CreateChatRoomDto): Promise<ChatRoom> {
        const chatRoom = this.create({
            ...createChatRoomDto,
            owner: account,
            createdAt: new Date()
        });
        await this.save(chatRoom);
        return chatRoom;
    }

    
}

@CustomRepository(Message)
export class MessageRepository extends Repository<Message> {
    async createMessage(account: Account, chatRoomId:number, text:string): Promise<Message> {
        const message = this.create({
            chatRoomId:chatRoomId,
            text:text,
            createdAt: new Date()
        });
        await this.save(message);
        return message;
    }
}