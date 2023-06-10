import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
    @ApiProperty({
        example: '마법사의 돌',
        description: '유저 닉네임',
    })
    readonly nickname: string;
    @ApiProperty({
        example: 'stone@example.com',
        description: '유저 이메일',
    })
    readonly email: string;
    @ApiProperty({
        example: 'password',
        description: '유저 비밀번호',
    })
    readonly password: string;
}

export class UpdateAccountDto {
    @ApiProperty({
        example: 'nickname',
        description: '유저 닉네임',
    })
    readonly nickname: string;

    @ApiProperty({
        example: '마블',
        description: '세계관',
    })
    readonly universe: string;

    @ApiProperty({
        example: '아이언맨',
        description: '캐릭터',
    })
    readonly character: string;
}

export class LoginAccountDto {
    @ApiProperty({
        example: 'stone@example.com',
    })
    readonly email: string;
    @ApiProperty({
        example: 'password',
    })
    readonly password: string;
}

export class AccountDto {
    constructor(id: number, nickname: string, email: string, universe?: string, character?: string) {
        this.id = id;
        this.nickname = nickname;
        this.email = email;
        this.universe = universe;
        this.character = character;
    }
    
    @ApiProperty({
        example: 1,
    })
    id: number;
    
    @ApiProperty({
        example: "마법사의 돌",
    })
    nickname: string;
    
    @ApiProperty({
        example: "stone@example.com"
    })
    email: string;

    @ApiProperty({
        example: "디즈니"
    })
    universe?: string;

    @ApiProperty({
        example: "엘사"
    })
    character?: string;
}