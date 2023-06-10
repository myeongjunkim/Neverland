import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Configuration, OpenAIApi } from 'openai'
import * as config from 'config'
import { CreateChatRoomDto } from './chatroom.dto';
import { Account } from 'src/account/account.entity';
import { ChatRoomRepository, MessageRepository } from './chatroom.repository';
import { ChatRoom, Message } from './chatroom.entity';


@Injectable()
export class ChatroomService {
    constructor(
        @InjectRepository(ChatRoomRepository)
        private chatRoomRepository : ChatRoomRepository,

        @InjectRepository(MessageRepository)
        private messageRepository : MessageRepository,
    ) {}

    async createChatRoom(account: Account, createChatRoomDto: CreateChatRoomDto): Promise<ChatRoom> {
        return await this.chatRoomRepository.createChatRoom(account, createChatRoomDto)
    }

    async fetchMessage(account: Account, chatRoomId:number): Promise<Message[]> {
        return await this.messageRepository.fetchMessage(account, chatRoomId)
    }

    async createMessage(account: Account, chatRoomId:number, text:string): Promise<Message> {
        return await this.messageRepository.createMessage(account, chatRoomId, text)
    }

    async fetchChatRoom(account: Account): Promise<ChatRoom[]> {
        return await this.chatRoomRepository.fetchChatRoom(account)
    }

    async getChatRoom(account, chatRoomId): Promise<ChatRoom> {
        return await this.chatRoomRepository.getChatRoomById(chatRoomId)
    }

    async requestGPT(text: string) {

        const universe = "호그와트"
        const character = "해리포터"

        const prompt = `${text}를 ${universe} 세계관에서 진짜 ${character}가 실제로 말하는 대사처럼 작성해줘.`

        const secretKey = config.get('secretKey')
        const configuration = new Configuration({
          apiKey: secretKey.gpt
        });
        const openai = new OpenAIApi(configuration);
        const completion = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: prompt,
          max_tokens: 150,
        });
        console.log(completion.data.choices);
        return completion.data.choices[0].text.trim();
      }
}
