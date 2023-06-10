import { ApiProperty } from '@nestjs/swagger';


export class GptDto {    
    
    @ApiProperty({
        example: '마블',
        description: '세계관',
    })
    universe: string;

    @ApiProperty({
        example: '아이언맨',
        description: '캐릭터',
    })
    character: string;
    
    @ApiProperty({
        example: '집가서 라면 먹고 싶다',
        description: '채팅 내용',
    })
    text: string;
}

export class GptResponseDto {
    constructor(text: string) {
        this.text = text;
    }
    text: string;
}