import { ApiProperty } from '@nestjs/swagger';




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


