import { Controller, Get, Post, Req, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ChatroomService } from './chatroom.service';
import { ChatRoomDto, CreateChatRoomDto, CreateMessageDto, MessageDto } from './chatroom.dto';
import { GetAccount } from 'src/account/get-user.decorator';
import { Account } from 'src/account/account.entity';
import { AuthGuard } from '@nestjs/passport';
import { Message } from './chatroom.entity';


@Controller('chatroom')
@ApiTags('ChatRoom')
// @UseGuards(AuthGuard())
export class ChatroomController {

    constructor(private readonly chatRoomService: ChatroomService) {}

    @Post("/")
    @ApiBody({ type: CreateChatRoomDto })
    @ApiResponse({ status: 201, description: 'ChatRoom has been successfully created', type: ChatRoomDto })
    @ApiOperation({ summary: '채팅방을 생성합니다.' })
    async createChatRoom(
        @GetAccount() account: Account,
        @Body() createChatRoomDto: CreateChatRoomDto,
    ): Promise<ChatRoomDto> {
        return await this.chatRoomService.createChatRoom(account, createChatRoomDto);
    } 

    @Get("/")
    @ApiResponse({ status: 201, description: 'Fetch ChatRoom', type: [ChatRoomDto] })
    @ApiOperation({ summary: '채팅방 목록을 불러옵니다.' })
    async fetchChatRoom(
        @GetAccount() account: Account,
    ): Promise<ChatRoomDto[]> {
        return await this.chatRoomService.fetchChatRoom(account);
    }

    @Get("/:id")
    @ApiResponse({ status: 201, description: 'get ChatRoom', type: ChatRoomDto })
    @ApiOperation({ summary: '채팅방을 불러옵니다.' })
    async getChatRoom(
        @GetAccount() account: Account,
        @Param('id') chatRoomId: number,
    ): Promise<ChatRoomDto> {
        return await this.chatRoomService.getChatRoom(account, chatRoomId);
    }
    

    @Post("/:id/message")
    @ApiBody({ type: CreateMessageDto })
    @ApiResponse({ status: 201, description: 'Message has been successfully created', type: Message })
    @ApiOperation({ summary: 'gpt 요청을 통해 입력된 text를 다시 작성하여 메세지를 전송합니다.' })
    async createMessage(
        @GetAccount() account: Account,
        @Param('id') chatRoomId: number,
        @Body() createMessageDto: CreateMessageDto,
    ): Promise<Message> {
        const gptResponse = await this.chatRoomService.requestGPT(createMessageDto.text)
        return await this.chatRoomService.createMessage(account, chatRoomId, gptResponse);
    } 

    @Get("/:id/message")
    @ApiResponse({ status: 201, description: 'Fetch Message', type: [Message] })
    @ApiOperation({ summary: '채팅방의 대화 목록을 불러옵니다.' })
    async fetchMessage(
        @GetAccount() account: Account,
        @Param('id') chatRoomId: number,
    ): Promise<Message[]> {
        return await this.chatRoomService.fetchMessage(account, chatRoomId);
    } 
}
