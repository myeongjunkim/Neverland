import { Repository } from "typeorm";
import { CustomRepository } from "src/db/typeorm-ex.decorator";
import { ChatRoom } from "./chatroom.entity";
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