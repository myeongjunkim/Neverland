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
    readonly nickname: string;
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
}