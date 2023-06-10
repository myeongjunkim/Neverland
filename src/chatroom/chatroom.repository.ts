import { Repository } from "typeorm";
import { CustomRepository } from "src/db/typeorm-ex.decorator";
import { ChatRoom, Message } from "./chatroom.entity";
import { Account } from "src/account/account.entity";
import { CreateChatRoomDto } from "./chatroom.dto";
import { NotFoundException } from "@nestjs/common";

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

    async fetchChatRoom(account: Account): Promise<ChatRoom[]> {
        const messages = await this.find({
            order: {
                createdAt: 'DESC',
            }
        })
        return messages;
    }

    async getChatRoomById(id: number): Promise<ChatRoom> {
        const chatRoom = await this.findOneBy({id: id})
        if(chatRoom) {
            return chatRoom;
        } else {
            throw new NotFoundException(`Can't find chatRoom with id ${id}`);
        }
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

    async fetchMessage(account: Account, chatRoomId:number): Promise<Message[]> {
        const messages = await this.find({
            where: {
                chatRoomId: chatRoomId
            },
            order: {
                createdAt: 'DESC',
            }
        })
        return messages;
    }
}