import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Configuration, OpenAIApi } from 'openai'
import * as config from 'config'
import { CreateChatRoomDto } from './chatroom.dto';
import { Account } from 'src/account/account.entity';
import { ChatRoomRepository } from './chatroom.repository';
import { ChatRoom } from './chatroom.entity';


@Injectable()
export class ChatroomService {
    constructor(
        @InjectRepository(ChatRoomRepository)
        private chatRoomRepository : ChatRoomRepository,
    ) {}

    async createChatRoom(account: Account, createChatRoomDto: CreateChatRoomDto): Promise<ChatRoom> {
        return await this.chatRoomRepository.createChatRoom(account, createChatRoomDto)
    }

    async requestGPT(prompt: string) {
        const secretKey = config.get('secretKey')
        const configuration = new Configuration({
          apiKey: secretKey.gpt
        });
        const openai = new OpenAIApi(configuration);
        const completion = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: "자기소개 부탁해",
        });
        console.log(completion.data.choices);
        return completion.data.choices[0].text;
      }
}
