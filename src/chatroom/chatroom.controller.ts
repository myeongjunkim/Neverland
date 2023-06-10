import { Controller, Get, Post, Req, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ChatroomService } from './chatroom.service';
import { ChatRoomDto, CreateChatRoomDto } from './chatroom.dto';
import { GetAccount } from 'src/account/get-user.decorator';
import { Account } from 'src/account/account.entity';
import { AuthGuard } from '@nestjs/passport';


@Controller('chatroom')
@ApiTags('ChatRoom')
// @UseGuards(AuthGuard())
export class ChatroomController {

    constructor(private readonly chatRoomService: ChatroomService) {}

    @Post("/create")
    @ApiBody({ type: CreateChatRoomDto })
    @ApiResponse({ status: 201, description: 'ChatRoom has been successfully created', type: ChatRoomDto })
    @ApiOperation({ summary: 'Create' })
    async createChatRoom(
        @Body() createChatRoomDto: CreateChatRoomDto,
        @GetAccount() account: Account,
    ): Promise<ChatRoomDto> {
        return await this.chatRoomService.createChatRoom(account, createChatRoomDto);
    } 
}
