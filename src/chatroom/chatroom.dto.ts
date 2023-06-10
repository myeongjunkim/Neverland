import { ApiProperty } from '@nestjs/swagger';
import { AccountDto } from 'src/account/account.dto';


export class ChatRoomDto {
    constructor(id: number, roomName: string, chatRoomType: string, hashTag: string, owner: AccountDto, createdAt: Date) {
        this.id = id;
        this.roomName = roomName;
        this.chatRoomType = chatRoomType;
        this.hashTag = hashTag;
        this.owner = owner;
        this.createdAt = createdAt;
    }

    @ApiProperty({
        example: 1,
        description: '채팅방 고유번호',
    })
    readonly id: number;

    @ApiProperty({
        example: '머글은 머글머글',
        description: '채팅방 이름',
    })
    readonly roomName: string;

    @ApiProperty({
        example: 'openchat',
        description: '채팅방 타입',
    })
    readonly chatRoomType: string;

    @ApiProperty({
        example: '아이언맨,헐크,토르',
        description: '채팅방 해시태그',
    })
    readonly hashTag: string;
    
    @ApiProperty({
        example: {
            id: 1,
            nickname: '마블',
            email: '',
            universe: '디즈니',
            character: '아이언맨',
        },
        description: '채팅방 주인',
    })
    readonly owner: AccountDto;
    
    @ApiProperty({
        example: '2021-01-01 00:00:00',
        description: '채팅방 생성일',
    })
    readonly createdAt: Date;

}


export class CreateChatRoomDto {
    @ApiProperty({
        example: '머글은 머글머글',
        description: '채팅방 이름',
    })
    readonly roomName: string;
    
    @ApiProperty({
        example: 'openchat',
        description: '채팅방 타입',
    })
    readonly chatRoomType: string;

    @ApiProperty({
        example: '아이언맨,헐크,토르',
        description: '채팅방 해시태그',
    })
    readonly hashTag: string;


    // onwer
}

export class MessageDto {
    
    @ApiProperty({
       example: 11,
    })
    readonly id: string;

    @ApiProperty({
        example: 3,
    })
    readonly chatRoomId: number
    
    @ApiProperty({
        example: '2021-01-01 00:00:00',
        description: '채팅 전송 시간',
    })
    readonly createdAt: Date;

    @ApiProperty({
        example: '아이엠 아이언맨',
        description: '채팅 내용',
    })
    readonly text: string;
}

export class CreateMessageDto {    
    @ApiProperty({
        example: '아이엠 아이언맨',
        description: '채팅 내용',
    })
    text: string;
}


